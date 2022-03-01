import React from 'react'
import { useSelector } from 'react-redux'

function MyPokemon() {
  const myPokemon = useSelector(store => store.pokedex.myPokemon)

  return (
    <div>
      {myPokemon.name && (
        <img className="my-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${myPokemon.id}.png`} alt={myPokemon.name}/>
      )}
    </div>
  )
}

export default MyPokemon
