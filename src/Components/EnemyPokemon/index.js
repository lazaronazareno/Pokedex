import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import pokemonType from '../../Assets/pokemontypes'
import Spinner from '../Spinner';

function EnemyPokemon() {
  const enemyPokemon = useSelector(store => store.pokedex.enemyPokemon)
  const loading = useSelector(store => store.pokedex.loading)
  const error = useSelector(store => store.pokedex.error)

  return (
    <div>
      {loading === true && (
        <Spinner />
      )}
      {error && (
        <>
          <h1>{error}</h1>
          <Link to="/" className="btn btn-dark">Back</Link>
        </>
      )}
      {(!loading) && (!error) && (enemyPokemon.name) && (
        <div>
          <img className="my-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${enemyPokemon.id}.png`} alt={enemyPokemon.name}/>
          <h1 className="pokemon-name">{enemyPokemon.name}</h1>
          {enemyPokemon.types.map((types) =>(
            <img className="pokemon-type_img" src={pokemonType[types.type.name].img} key={types.type.name} alt={types.type.name}/>
          ))}
          {enemyPokemon.stats.map((stats) =>(
            <div className="pokemon-meter d-flex justify-content-between" key={stats.stat.name}>
              <span>{stats.stat.name} : {stats.base_stat}</span>
              <meter                   
              min="0" 
              max='255'
              value={stats.base_stat}>
                {stats.stat.name}
              </meter>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnemyPokemon
