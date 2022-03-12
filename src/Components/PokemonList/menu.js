import React from 'react'
import { useDispatch } from 'react-redux';
import { getPokemonsByGeneration, isLoading } from '../../Redux/reducers';
import './styles.scss'

function MenuPokemonList() {
  const dispatch = useDispatch();

  let handleGenerations = (amnt, gen) => {
    dispatch(isLoading(true))
    dispatch(getPokemonsByGeneration(amnt, gen))
}
  return (
    <div className="menu-container dropdown">
      <button className="btn btn-lg btn-primary dropdown-toggle" data-bs-toggle="dropdown" href="#">Filter by Generations</button>
      <ul className="dropdown-menu p-0">
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(151, 0)}>Gen I</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(100, 151)}>Gen II</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(135, 251)}>Gen III</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(107, 386)}>Gen IV</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(156, 493)}>Gen V</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(72, 649)}>Gen VI</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(88, 721)}>Gen VII</button>
          <button className="list-group-item list-group-item-action dropdown-item"
          onClick={() => handleGenerations(89, 809)}>Gen VIII</button>
      </ul>
    </div>
  )
}

export default MenuPokemonList
