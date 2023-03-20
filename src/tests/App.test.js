import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import allPokemons from '../tests/mocks/dataApi';
import renderWithRouter from '../helpers/renderWithRouter';
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
  renderWithRouter(<App />);
  const buttonAll = screen.getByTestId('all-button');
  expect(buttonAll).toBeInTheDocument();
  expect(buttonAll).toHaveProperty('className', 'all-button');

  test('Verifica se tem todos os botões dos tipos', async () => {
    render(<App />);
    const allTypeButtons = screen.getAllByRole('button');
    expect(allTypeButtons).toHaveLength(19);
  })

  it('Redireciona para a página de detalhes do pokemon ao clicar no card',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/');

      const charmanderCard = await screen.findByText('charmander');
      expect(charmanderCard).toBeInTheDocument();
      userEvent.click(charmanderCard);
      expect(history.location.pathname).toBe('/3');
      // espera que vá para outra pagina
    });



});