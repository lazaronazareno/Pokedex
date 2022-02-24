import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home'
import PokemonDetails from './Components/PokemonDetails';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/details/:id" element={<PokemonDetails />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
