import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import Context from './PokemonContext';

function Provider({ children }) {
  const [pokemons, setPokemons] = useState();
  const [pkNImg, setpkNImg] = useState([]);
  const [images, setImages] = useState([]);
  const [inputName, setInputName] = useState([]);
  const [searchPK, setSearchPK] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [filteredType, setFilteredType ] = useState('all');
  const [pokeFiltered, setPokeFiltered ] = useState([]);

  const arrayPokemons = () => {
    for (let i = 1; i <= 20; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pkNImg.push(fetch(url).then((res) => res.json()));
      console.log('url', pkNImg);
    }
    Promise.all(pkNImg).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name),
        id: result.id
      }));
      console.log('image', pokemon);
      setImages(pokemon);
    });
  };

  const getPokemons = () => {
    api.get('').then((response) => {
      const res = response.data.results;
      setPokemons(res);
      console.log('res', pokemons);
    }).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  const filterInput = () => {
    const filterName = images.filter((e) => e.name.includes(inputName));
    setImages(filterName);
  };

  const getFilteredPokemons = () => {

    const pokemonFiltered = images.filter((pokemon) => {
      return pokemon.type.includes(filteredType);
    });
    setPokeFiltered(pokemonFiltered);
  }

  const changeFilteredType = (filteredType) => {
    console.log(filteredType);
    setFilteredType(filteredType);
  }


  useEffect(() => {
    getPokemons();
    arrayPokemons();
  }, []);

  useEffect(() => {
    getFilteredPokemons();
    console.log('filtrados', pokeFiltered)
  }, [filteredType]);


  const value = {
    pokemons,
    images,
    inputName,
    filterInput,
    pokeFiltered,
    filterActive,
    setFilterActive,
    getFilteredPokemons,
    changeFilteredType,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

// Provider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

export default Provider;
