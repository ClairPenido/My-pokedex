import React from 'react';
import './styles/App.css';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import PokemonDetails from './components/PokemonDetails';


function App() {
  return (
    <div className='App'>
      <Provider>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/:id' element={<PokemonDetails />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;