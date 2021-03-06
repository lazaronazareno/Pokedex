import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux'
import Battle from './Components/Battle';
import Home from './Components/Home'
import MyPokemon from './Components/myPokemon';
import PokemonDetails from './Components/PokemonDetails';
import PokemonList from './Components/PokemonList';
import Search from './Components/Search';

function App() {
  const myPokemon = useSelector(store => store.pokedex.myPokemon)

  return (
    <div className="App bg-danger">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/pokedex" element={<PokemonList />} />
            <Route exact path="/details/:id" element={<PokemonDetails />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/myPokemon" element={<MyPokemon myPokemon={myPokemon} />} />
            <Route exact path="/fight" element={<Battle />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
