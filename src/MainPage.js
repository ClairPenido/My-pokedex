import Pokemon from './components/Pokemon';
import PokemonDetails from './components/PokemonDetails';
import { Route, Router, Switch } from 'react-router-dom';
import Pokedex from './components/Pokedex';


function MainPage() {
  return (
    <div>
    <Pokedex/>
  </div>
  );
}

export default MainPage;