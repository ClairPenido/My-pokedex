import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pokemonObject from '../types/pokemonObject';
import '../styles/pokemonDetails.css';
import Pokemon from './Pokemon';

class PokemonDetails extends Component {
  render() {
    const {
      pokemons,
      favorites,
      onChangeFavorite,
      match: {
        params: { id },
      },
    } = this.props;
    const pokemonFound = pokemons.find((pok) => pok.id === Number(id));
    const isFavorite = favorites.some((fav) => fav.id === pokemonFound.id);

    return (
      <section className="pokemon-details">
        <h2>
          {`${pokemonFound.name} Details`}
        </h2>
        <Pokemon
          pokemon={ pokemonFound }
          isFavorite={ isFavorite }
          hideLink
        />
        <h2>Sumário:</h2>
        <p>{pokemonFound.summary}</p>
        <h2>Hábitat:</h2>
        <section className="pokemon-habitat">
          { pokemonFound.foundAt.map((location) => (
            <section key={ location.location }>
              <span>{ location.location }</span>
              <img src={ location.map } alt="mapa do pokemon" />
            </section>
          )) }
        </section>
        <label className="favorite-input" htmlFor="isFavoritedInput">
          <h3>Pokemon Favoritado?</h3>
          <input
            type="checkbox"
            id="isFavoritedInput"
            checked={ isFavorite }
            onChange={ () => onChangeFavorite(pokemonFound, isFavorite) }
          />
        </label>
      </section>
    );
  }
}

PokemonDetails.propTypes = {
  pokemons: PropTypes.arrayOf(pokemonObject.isRequired).isRequired,
  favorites: PropTypes.arrayOf(pokemonObject.isRequired).isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default PokemonDetails;