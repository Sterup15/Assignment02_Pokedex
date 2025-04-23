import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=18');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  useEffect(() => {
    axios.get(url).then(res => {
      setPokemonList(res.data.results);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
    });
  }, [url]);

  return (
    <div>
      <h1 className="yellow-blue-text">Pokédex</h1>
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.name} url={pokemon.url} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setUrl(prevUrl)} disabled={!prevUrl}>Previous</button>
        <button onClick={() => setUrl(nextUrl)} disabled={!nextUrl}>Next</button>
      </div>
    </div>
  );
};

export default Pokedex;
