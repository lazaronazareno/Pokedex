import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eraseState } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import pokemonType from '../../Assets/pokemontypes'
import './styles.scss'

const MyPokemon = ({  myPokemon }) => {
  const dispatch = useDispatch();
  const enemyPokemon = useSelector(store => store.pokedex.enemyPokemon)
  const searchPokemonList = useSelector(store => store.pokedex.searchPokemonList)

  return (
    <div className="d-flex justify-content-center">
      {myPokemon && (
        <div>
          <img className="my-pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${myPokemon.id}.png`} alt={myPokemon.name}/>
          <h1 className="pokemon-name">{myPokemon.name}</h1>
          {myPokemon.types.map((types) =>(
            <img className="pokemon-type_img" src={pokemonType[types.type.name].img} key={types.type.name} alt={types.type.name}/>
          ))}
          <div>
            {myPokemon.stats.map((stats) =>(
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
          {!enemyPokemon.name && !searchPokemonList.name && (
            <Link to="/" onClick={() => dispatch(eraseState())} className="btn btn-primary">Back</Link>
          )}
        </div>
      )}
      {!myPokemon && (
        <>
          <h1>Looks like you havent choose a favorite pokemon. I know its hard but try it</h1>
          <Link to="/pokedex" className="btn btn-primary">Go</Link>
        </>
      )}
    </div>
  )
}

export default MyPokemon
