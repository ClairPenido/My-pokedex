import React, { Component, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Pokemon from './Pokemon';
import '../styles/pokedex.css';
import pokemonObject from '../types/pokemonObject';
import PokemonContext from '../context/PokemonContext';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredType, setFilteredType ] = useState('all');
  const [pokemonIndex, setPokemonIndex ] = useState(0);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const {
    images,
    inputName,
    setInputName,
    filterInput,
    filterActive, 
    pokeFiltered,
    setFilterActive,
    getFilteredPokemons,
    changeFilteredType,
  } = useContext(PokemonContext);


  const getPokemonTypes = () => {
    const pokemonTypesArr = images.reduce((types, { type }) => [...types, ...type], []);
    // Transformando o Array em um Set, dentro de um Set os valores nunca podem se repetir
    // dessa forma garantindo que não teremos tipos repetidos.
    // Leitura sobre o Set: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set
    const pokemonTypeSet = new Set(pokemonTypesArr);
    console.log(pokemonTypeSet);

    // Transformando o Set em array novamente com o Spread para utilizarmos normalmente no restante do código
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
          {/* <label> Nome:  
          <input
              placeholder='digite o nome do pokemon'
              name="saveInput"
              type="text"
              maxLength="1"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </label>*/}
        </header>
        <Pokemon />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={ () => {
              changeFilteredType('all');
              setFilterActive(false);
            } }
            className="filter-button"
          >
            all
          </Button>
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
    );
  }

Pokedex.propTypes = {
  // favorites: PropTypes.arrayOf(pokemonObject).isRequired,
  pokemons: PropTypes.arrayOf(pokemonObject).isRequired,
};

export default Pokedex;