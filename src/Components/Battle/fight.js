import React from 'react'
import Spinner from '../Spinner'

const Fight = ({  results, myStats, enemyStats, pokemonName, enemyPokemonName}) => {
  return (
    <div>
      <h1>{results}</h1>
      <h1 className="pokemon-name">{pokemonName} got {myStats} Power after count</h1>
      <h1 className="pokemon-name">{enemyPokemonName} got {enemyStats} Power after count</h1>
      <h1 className="pokemon-name">{myStats > enemyStats ? `${pokemonName} Wins!!` : `${enemyPokemonName} Wins!!`}</h1>
    </div>
  )
}

export default Fight
