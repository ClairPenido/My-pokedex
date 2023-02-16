import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pokemon.css';
import PokemonContext from '../context/PokemonContext';

export default function Pokemon() {
  const {
    images,
    filterActive, 
    pokeFiltered,
  } = useContext(PokemonContext);

  const types = (types) => {
    const result = types.map((t) => {
      return (<span className={`${t}-type`}> {t} </span>)
    })
    return result;
  }
  const list = filterActive ? pokeFiltered : images;

  return (
    <div className="pokemon">

      {list.map((pk) => {
        return (
          <div className="pokemon-overview">
            <Link
              to={`/${pk.id}`}
              key={pk.id}
            >
              <div className='pokemon-box'>
                <img className='pokemon-image' src={pk.image} alt={pk.name} />
                <p>{pk.name}</p>
                <em><p className='number'>Nº {pk.id}</p></em>
                {pk.type.length > 0 && types(pk.type)}
              </div>
            </Link>
          </div>
        )
      })}

    </div>
  );
}

