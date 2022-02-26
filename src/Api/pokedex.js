const BASE_URL = 'https://pokeapi.co/api/v2'; 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
  const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));
  
  async function callApi(endpoint, options = {}) {
    await simulateNetworkLatency();
    
    options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Referer': 'http://localhost:3000',
    'Access-Control-Allow-Origin': 'http://localhost:3000', 
  };
  
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  
  return data;
}

const pokedexApi = {
  pokedex: {
    getPokemons(page) {
        return callApi(`/pokemon/?limit=18&offset=${18*(page-1)}`);
      },
    getPokemonById(id) {
        return callApi(`/pokemon/${id}`)
    },
    getPokemonDescription(id) {
        return callApi(`/pokemon-species/${id}`)
    },
    getPokemonImage(id) {
      return callApi(`/pokemon-form/${id}`)
    },
    getTypeRelation(name) {
      return callApi(`/type/${name}`)
    }
  },
};

export default pokedexApi;