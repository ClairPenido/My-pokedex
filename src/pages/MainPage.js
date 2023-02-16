import React, { useContext } from 'react';
import Pokedex from '../components/Pokedex';
import Context from '../context/PokemonContext';
import Loading from '../components/Loading';
import '../styles/mainPage.css';


function MainPage() {
  const {
    loading,
  } = useContext(Context);

  return (
    <div>
      {loading ?
        < Loading /> : <Pokedex />
      }
    </div>
  );
}

export default MainPage;