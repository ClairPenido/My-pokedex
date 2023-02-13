import React from 'react';
import './App.css';
import MainPage from './MainPage';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import PokemonDetails from './components/PokemonDetails';


function App() {
  return (
    <div className='App'>
      <Provider>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/:id' element={<PokemonDetails/>}/>
      </Routes>
      </Provider>
    </div>
  );
}

export default App;