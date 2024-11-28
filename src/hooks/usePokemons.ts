import { useState, useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  url: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
}

const usePokemons = (page: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
        );
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: Pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            const id = details.id;

            return {
              name: pokemon.name,
              url: pokemon.url,
              id: id,
              image: details.sprites.front_default,
              types: details.types.map((type: { type: { name: string } }) => type.type.name),
              abilities: details.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
              height: details.height,
              weight: details.weight,
              stats: details.stats.map((stat: { stat: { name: string }; base_stat: number }) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
            };
          })
        );

        setPokemons((prev) => {
          const newPokemons = detailedPokemons.filter(
            (newPokemon) => !prev.some((existingPokemon) => existingPokemon.id === newPokemon.id)
          );
          return [...prev, ...newPokemons];
        });

        setHasMore(data.next !== null);
      } catch (error) {
        setError('Failed to fetch pokemons');
        console.error('Failed to fetch pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page]);

  return { pokemons, loading, error, hasMore };
};

export default usePokemons;
