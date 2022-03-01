import React from 'react'
import { Link } from 'react-router-dom'

function Pokedex() {
  return (
    <div>
      <h1>Pokedex App</h1>
      <Link to="/pokedex" className="btn btn-warning">Pokedex</Link>
      <Link to="/search" className="btn btn-warning">Search</Link>
      <Link to="/mypokemon" className="btn btn-warning">My Pokemon</Link>
    </div>
  )
}

export default Pokedex
