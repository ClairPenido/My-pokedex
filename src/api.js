import axios from 'axios';
// const axios = require('axios');
// const axios = require('axios/dist/browser/axios.cjs');


const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});


export default api;