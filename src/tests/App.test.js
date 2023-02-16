import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import allPokemons from '../tests/mocks/dataApi';
import userEvent from '@testing-library/user-event';
const axios = require('axios');

describe('Testando a requesicão da API', () => {
  test('Testando a requesicão da API', () => {
    axios.get.mockImplementation(() => Promise.resolve({
       json: () => Promise.resolve(allPokemons),
      }));
      render(<App />)
    })
    jest.clearAllMocks();
  })
  test('Verifica botão all dos filtros', async () => {
    // jest.spyOn(global, 'fetch')
    // .mockImplementation(() => Promise.resolve({
    //  json: () => Promise.resolve(allPokemons),
    // }));
    render (<App />);
    const buttonAll = screen.getByTestId('all-button');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveProperty('className', 'all-button');

    test('Verifica se tem todos os botões dos tipos', async () => {
      render (<App />);
      const allTypeButtons = screen.getAllByRole('button');
      expect(allTypeButtons).toHaveLength(19);
    })
    
  
    const charmanderCard = await screen.findByText('charmander');
    expect(charmanderCard).toBeInTheDocument();
    userEvent.click(charmanderCard);
  // espera que vá para outra pagina
  });