import React, { useState, useEffect, useContext } from 'react';
import Button from './Button';
import Pokemon from './Pokemon';
import '../styles/pokedex.css';
import PokemonContext from '../context/PokemonContext';

function Pokedex() {
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const {
    images,
    setFilterActive,
    changeFilteredType,
  } = useContext(PokemonContext);


  const getPokemonTypes = () => {
    const pokemonTypesArr = images.reduce((types, { type }) => [...types, ...type], []);
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set
    const pokemonTypeSet = new Set(pokemonTypesArr);
    console.log(pokemonTypeSet);
    return [...pokemonTypeSet];
  }


  useEffect(() => {
    setPokemonTypes(getPokemonTypes());
  }, [images]);

    return (
      images.length && 
      <div className="pokedex">
        <header>
          <img src='https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png' alt='aa' />
        </header>
        
        <div className="pokedex-buttons-container">
          <Button
          className="filter-button all-button"
            onClick={ () => {
              changeFilteredType('all');
              setFilterActive(false);
            } }
          >
            all
          </Button>
          <div className='pokedex-buttons-panel'>
          { pokemonTypes.map((type) => (
            <Button
              key={ type }
              onClick={ () => {
                changeFilteredType(type);
                setFilterActive(type !== 'all'); 
               } }
              className="filter-button"
            >
              { type }
            </Button>
          )) }
          </div>
        </div>
        <Pokemon />
      </div>
    );
  }

export default Pokedex;