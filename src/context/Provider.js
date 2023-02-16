/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './PokemonContext';
import api from '../api';

function Provider({ children }) {
  const [pokemons, setPokemons] = useState();
  const [pkNImg, setpkNImg] = useState([]);
  const [images, setImages] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [filteredType, setFilteredType ] = useState('all');
  const [pokeFiltered, setPokeFiltered ] = useState([]);
  const [details, setDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const arrayPokemons = () => {
    for (let i = 1; i <= 400; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pkNImg.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(pkNImg).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name),
        id: result.id
      }));
      setImages(pokemon);
      setLoading(false);
    });
  };

  const getPokemons = () => {
    api.get('').then((response) => {
      const res = response.data.results;
      setPokemons(res);
    }).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  const getFilteredPokemons = () => {

    const pokemonFiltered = images.filter((pokemon) => {
      return pokemon.type.includes(filteredType);
    });
    setPokeFiltered(pokemonFiltered);
  }

  const changeFilteredType = (filteredType) => {
    setFilteredType(filteredType);
  }

  const CatchDetails = async (id) => {
    const res = await api.get(`/${id}`);
      const data = res.data;
      setDetails(data);
  }

  useEffect(() => {
    getPokemons();
    arrayPokemons();
  }, []);

  useEffect(() => {
    getFilteredPokemons();
  }, [filteredType]);


  const value = {
    pokemons,
    images,
    pokeFiltered,
    filterActive,
    setFilterActive,
    getFilteredPokemons,
    changeFilteredType,
    CatchDetails,
    details,
    loading,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
