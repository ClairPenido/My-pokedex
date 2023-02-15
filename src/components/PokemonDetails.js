import React, { Component, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PokemonContext from '../context/PokemonContext';
import '../styles/pokemonDetails.css';
import { useParams } from 'react-router-dom';
import api from '../api';
import axios from 'axios';

export default function PokemonDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(false);
  const [evolutions, setEvolutions] = useState();
  const [description, setDescription] = useState();
  const [moreHiddenInfo, setMoreHiddenInfo] = useState(false);
  const [moreNormalInfo, setMoreNormalInfo] = useState(false);
  const [abiliteHidden, setAbiliteHidden] = useState();
  const [abiliteNormal, setAbiliteNormal] = useState();

  const catchAbilitiesHidden = async (a) => {
    console.log('clicou no escondido');
    const res = await api.get(`${a}`);
    const data = await res.data;
    const ability = data.effect_entries[1].short_effect;
    console.log('data:', data.effect_entries[1].short_effect);
    setAbiliteHidden(ability);
  }

  const catchAbilitiesNormal = async (a) => {
    console.log('clicou no normal');
    const res = await api.get(`${a}`);
    const data = await res.data;
    console.log('normal', data);
    const ability = data.effect_entries[0].short_effect;
    console.log('data:', data.effect_entries[0].short_effect);
    setAbiliteNormal(ability);
  }

  useEffect(() => {
    (async () => {
      const res = await api.get(`/${id}`);
      const data = res.data;
      console.log('res', data);
      setDetails(data);
      const teste = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const alo = teste.data.flavor_text_entries[9];
      setEvolutions(alo);
      console.log('evolutions', alo);
    })() //funcao anonima
  }, []);


  return (
    details &&
    <section className="pokemon-details">
      <h2 className='details-title'>
        {`${details.forms[0].name} details`}
      </h2>
      <div className='pokemon-container'>
        <div className='pokemon-stats'>
          <em><p className='number'>Nº {details.id}</p></em>
          <img className='details-img' src={details.sprites['front_default']} alt={details.forms[0].name} />
          <p className='base-stats'> <h3>Base Stats: </h3>  {details.stats.map((stts) => {
            return (
              <span className={`stats-type`}> {stts.stat.name} - {stts.base_stat} </span>)
          })}
          </p>
        </div>
        <div className='pokemon-info'>
          <p>{evolutions.flavor_text}</p>
          <div>
            <p>Height: {details.height} m</p>
            <p>Weight: {details.weight} kg</p>
          </div>
          <p className='abilites-info'> Abilities: {details.abilities.map((a) => a.is_hidden ?
            (<p className='info-hidden'><em>{a.ability.name}</em>
              <button value={a.ability.name} className='i-button' onClick={() => { setMoreHiddenInfo(!moreHiddenInfo); catchAbilitiesHidden(a.ability.url)}}> i </button>
             {moreHiddenInfo ? <div><span className='more-info'>{abiliteHidden}</span></div> : null}
            </p>)
            : (<p>{a.ability.name}
              <button className='i-button' onClick={() => { setMoreNormalInfo(!moreNormalInfo); catchAbilitiesNormal(a.ability.url)}}> i </button>
              {moreNormalInfo && <div><span className='more-info'>{abiliteNormal}</span></div>}
            </p>))
          }
          </p>
          <p>Type: {details.types.map((type) => {
            let result = type.type.name;
            return (<span className={`${result}-type`}> {result} </span>)
          })}
          </p>
        </div>
        <div> Evoluções:

        </div>
      </div>
    </section>
  );
}
