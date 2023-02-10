import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Pokemon from './Pokemon';
import '../styles/pokedex.css';
import pokemonObject from '../types/pokemonObject';

function Pokedex() {
    return (
      <div className="pokedex">
        <Pokemon
          // pokemon={ pokemon }
        />
        <div className="pokedex-buttons-panel">
          <Button
            onClick={ () => this.changeFilteredType('all') }
            className="filter-button"
          >
            All
          </Button>
          {/* { pokemonTypes.map((type) => (
            <Button
              key={ type }
              onClick={ () => this.changeFilteredType(type) }
              className="filter-button"
            >
              { type }
            </Button>
          )) } */}
        </div>
      </div>
    );
  }

Pokedex.propTypes = {
  favorites: PropTypes.arrayOf(pokemonObject).isRequired,
  pokemons: PropTypes.arrayOf(pokemonObject).isRequired,
};

export default Pokedex;