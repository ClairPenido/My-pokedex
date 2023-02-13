import React, { Component, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PokemonContext from '../context/PokemonContext';
import '../styles/pokemonDetails.css';
import Pokemon from './Pokemon';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function PokemonDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(false);
  const [arrayPkDetails, setArrayPkDetails] = useState();


  useEffect(() => {
    (async () => {
      const res = await api.get(`/${id}`);
      const data = res.data;
      console.log('res', data);
      setDetails(data);

    })() //funcao anonima
  }, []);


  return (
    details &&
    <section className="pokemon-details">
      <div>
        <h2>
          {`${details.forms[0].name} details`}
        </h2>
        <em><p className='number'>Nº {details.id}</p></em>
        <img className='pokemon-image' src={details.sprites['front_default']} alt={details.forms[0].name} />
        <p>Type: {details.types.map((type) => {
          let result = type.type.name;
          return (<span className={`${result}-type`}> {result} </span>)
        })}
        </p>
        <p>Height: {details.height} m</p>
        <p>Weight: {details.weight} kg</p>
        <p>Status: {details.stats.map((stts) => {
          return (
            <span className={`${stts.name}-type`}> {stts.stat.name} {stts.base_stat} </span>)
        })}
        </p>
        <p> Abilities: {details.abilities.map((a) => a.is_hidden ? (<span><em>{a.ability.name}</em></span>) : (<span>{a.ability.name}</span>))
        }
        </p>
      </div>
    </section>
  );
}
