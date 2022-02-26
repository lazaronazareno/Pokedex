import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css'
import pokemonType from '../../Assets/pokemontypes'

function PokemonDetails() {
  const pokemonDetails = useSelector(store => store.pokedex.details)
  console.log(pokemonDetails)
  const loading = useSelector(store => store.pokedex.loading)
  const error = useSelector(store => store.pokedex.error)

  return (
    <div className="d-flex flex-column">
    { loading === true && (
    <div className="d-flex justify-content-center m-3">
        <div className="spinner-border" role="status" />
    </div>
  )}
    { pokemonDetails.name && (
        <div className="d-flex flex-column align-items-center">
            <h1>{pokemonDetails.name}</h1>
            <div className="pokemon-infograph d-flex">
              <div className="d-flex">
                {pokemonDetails.types.map((types) =>(
                  <img src={pokemonType[types.type.name]}/>
                  ))}
              </div>
              <img className="pokemon-details_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`} alt={pokemonDetails.name}/>
              <div>
                <span>Strong</span>
                <span>WeaK</span>
              </div>
            </div>
            <div>
              <span>Base Stats</span>
              {pokemonDetails.stats.map((stats) =>(
                <div>
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
            <Link to="/" className="btn btn-dark">Back</Link>
        </div>
    )}
    {error && (
        <h1>{error}</h1>
    )}
    {(!pokemonDetails) && (loading === false) && (
      <>
        <h1>Error: Quotes not Found</h1>
        <Link to='/' className="btn btn-dark btn-lg">Back</Link>
      </>
    )}
</div>
  )
}

export default PokemonDetails
