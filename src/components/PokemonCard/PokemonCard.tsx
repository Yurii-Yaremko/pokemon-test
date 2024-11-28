import React from 'react';

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    types: string[];
    abilities: string[];
    height: number;
    weight: number;
    stats: { name: string; value: number }[];
  };
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img
        src={pokemon.image || 'https://via.placeholder.com/150'}
        alt={pokemon.name}
        className="w-full h-30 object-cover"
      />
      <h2 className="text-lg font-bold mt-2 text-center capitalize">{pokemon.name}</h2>
      <div className="text-sm mt-2">
        <p><strong>Types:</strong> {pokemon.types.join(', ')}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
        <p><strong>Height:</strong> {pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
        <div>
          <strong>Stats:</strong>
          <ul className="list-disc pl-4">
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => onFavoriteToggle(pokemon.id)}
        className={`mt-4 p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default PokemonCard;
