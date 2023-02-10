import React, { useEffect, useState } from 'react';
import api from '../api';
// import { Link } from 'react-router-dom';
import '../styles/pokemon.css';
import PropTypes from 'prop-types';

export default function Pokemon() {
  const [pokemons, setPokemons] = useState();
  const [pkNImg, setpkNImg ] = useState([]);
  const [images, setImages ] = useState([]);


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
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
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

  useEffect(() => {
    getPokemons();
    arrayPokemons();
  }, []);



  return (
   pokemons &&
    <div className="pokemon">
      <div className="pokemon-overview">
        {images.map((pk) => {
          return (
            <div>
            <p>{pk.name}</p>
            <img src={pk.image} alt='aa'/>
            <em><p>n:{pk.id}</p></em>
            <p>Type:{pk.type}</p>
            </div>
          )
        })}


      </div>
    </div>
  );
}

// Pokemon.propTypes = {
//   isFavorite: PropTypes.bool,
//   pokemon: pokemonObject.isRequired,
//   hideLink: PropTypes.bool,
// };

// Pokemon.defaultProps = {
//   isFavorite: false,
//   hideLink: false,
// };
