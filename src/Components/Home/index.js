import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addEnemyPokemon, isLoading } from '../../Redux/reducers';
import './styles.scss'

function Pokedex() {
  const dispatch = useDispatch();

  let handleFight = () => {
    dispatch(isLoading(true))
    dispatch(addEnemyPokemon())
}
  
  return (
    <div className="home d-flex flex-column justify-content-evenly">
      <h1>Pokedex App</h1>
      <Link to="/pokedex" className="link-home btn btn-primary">Pokedex</Link>
      <Link to="/search" className="link-home btn btn-primary">Search</Link>
      <Link to="/mypokemon" className="link-home btn btn-primary">My Pokemon</Link>
      <Link to="/fight" className="link-home btn btn-primary" onClick={() => handleFight()}>Battle</Link>
    </div>
  )
}

export default Pokedex
