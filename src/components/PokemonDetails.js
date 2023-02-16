import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PokemonContext from '../context/PokemonContext';
import '../styles/pokemonDetails.css';
import { useParams } from 'react-router-dom';
import api from '../api';
import axios from 'axios';

export default function PokemonDetails() {
  const { id } = useParams();
  const [description, setDescription] = useState();
  const [moreHiddenInfo, setMoreHiddenInfo] = useState(false);
  const [moreNormalInfo, setMoreNormalInfo] = useState(false);
  const [abiliteHidden, setAbiliteHidden] = useState();
  const [abiliteNormal, setAbiliteNormal] = useState();

  const {
    CatchDetails,
    details,
  } = useContext(PokemonContext);


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
    console.log('normal', data.effect_entries);
    const ability = data.effect_entries[0].short_effect;
    const teste = await data.effect_entries.map((ab)=> ab.filter(ab.language.name === 'en') ); //! ajuda daqui
    console.log('teste', teste);
    
    setAbiliteNormal(ability);
  }

  useEffect(() => {
    (async () => {
      CatchDetails(id);
      const results = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const resDescription = results.data.flavor_text_entries[9];
      setDescription(resDescription);
      console.log('descrição', resDescription);
    })() //funcao anonima
  }, []);


  return (
    details &&
    description &&
    <section className="pokemon-details">
      <h2 className='details-title'>
        {`${details.forms[0].name} details`}
      </h2>
      <div className='pokemon-container'>
        <div className='pokemon-stats'>
          <em><p className='number-detail'>Nº {details.id}</p></em>
          <img className='details-img' src={details.sprites['front_default']} alt={details.forms[0].name} />
          <p className='base-stats'> <h3>Base Stats: </h3>  {details.stats.map((stts) => {
            return (
              <span className={`stats-type`}> {stts.stat.name} - {stts.base_stat} </span>)
          })}
          </p>
        </div>
        <div className='pokemon-info'>
          <h3 className='description-title'>Description</h3>
          <p className='description'>{description.flavor_text}</p>
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
      </div>
    </section>
  );
}
