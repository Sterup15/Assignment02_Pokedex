import { useEffect, useState } from "react";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [url]);

  const formatName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  if (!pokemon) return <div>Loading...</div>;

  const primaryType = pokemon.types[0].type.name;
  const modalClass = `pokemon-modal-content ${primaryType}`;
  const cardClass = `pokemon-card ${primaryType}`; // 👈 Add type class here

  return (
    <>
      <div className={cardClass} onClick={() => setShowModal(true)}>
        <h3>{formatName(pokemon.name)}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>

      {showModal && (
        <div className="pokemon-modal" onClick={() => setShowModal(false)}>
          <div className={modalClass} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>
              {formatName(pokemon.name)} (#{pokemon.id})
            </h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>
              <strong>Type(s):</strong>{" "}
              {pokemon.types.map((t) => (
                <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                  {formatName(t.type.name)}
                </span>
              ))}
            </p>
            <p>
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities
                .map((a) => formatName(a.ability.name))
                .join(", ")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
