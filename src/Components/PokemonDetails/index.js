import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, addEnemyPokemon, addMyPokemon, eraseState, getTypeRelation, isLoading } from '../../Redux/reducers';
import { Link,  useLocation  } from 'react-router-dom';
import './styles.scss'
import '../../Assets/color.scss'
import pokemonType from '../../Assets/pokemontypes'
import Spinner from '../Spinner';

function PokemonDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.replace(/[^0-9]/g,'')

  const pokemonDetails = useSelector(store => store.pokedex.pokemonDetails)
  const pokemonDescription = useSelector(store => store.pokedex.pokemonDescription)
  const myPokemon = useSelector(store => store.pokedex.myPokemon)
  const pokemonStrong = useSelector(store => store.pokedex.pokemonStrong)
  const pokemonWeak = useSelector(store => store.pokedex.pokemonWeak)
  const loading = useSelector(store => store.pokedex.loading)
  const error = useSelector(store => store.pokedex.error)

  const handleFight = (pokemon) => {
    dispatch(isLoading(true))
    dispatch(addMyPokemon(pokemon))
    dispatch(isLoading(true))
    dispatch(addEnemyPokemon())
}

  useEffect(() => {
    dispatch(isLoading(true))
    dispatch(getDetails(id))
    if(pokemonDetails.name){
      dispatch(isLoading(true))
      dispatch(getTypeRelation(pokemonDetails))
    }
    return;
// eslint-disable-next-line
  }, [pokemonDetails.name])



  return (
    <div className="d-flex flex-column">
    { (loading === true) && (
      <Spinner />
  )}
    { (pokemonDescription.color) && (pokemonDetails.name) && (
        <div className="pokemon-details bg-danger d-flex flex-column align-items-center">
            <h1 className="pokemon-name">{pokemonDetails.name} - #{pokemonDetails.id}</h1>
            <div className={`pokemon-infograph d-flex ${pokemonDescription.color.name}`}>
              <div className="d-flex my-type">
                {pokemonDetails.types.map((types) =>(
                  <img className="pokemon-type_img" src={pokemonType[types.type.name].img} key={types.type.name} alt={types.type.name}/>
                  ))}
              </div>
              <img className="pokemon-details_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`} alt={pokemonDetails.name}/>
              <div className="weakness-container d-flex flex-column">
                <h1>Strong vs</h1>
                <div className="d-flex flex-wrap">
                  {!pokemonStrong && ( <Spinner /> )}
                  { pokemonStrong && (
                    pokemonStrong.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img} key={pokemonType[types].name} alt={pokemonType[types].name}/>
                    ))
                  )}
                </div>
                <h1>Weak vs</h1>
                <div className="d-flex flex-wrap">
                  {!pokemonWeak && ( <Spinner />)}
                  { pokemonWeak && (
                    pokemonWeak.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img} key={pokemonType[types].name} alt={pokemonType[types].name}/>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="pokemon-stats-info d-flex">
              <div className="pokemon-stats d-flex flex-column">
                <h1>Base Stats</h1>
                {pokemonDetails.stats.map((stats) =>(
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
            <div className="pokemon-info d-flex flex-column">
              <span>{pokemonDescription.flavor_text_entries[1].flavor_text}</span>
              <button className="btn btn-primary" onClick={() => dispatch(addMyPokemon(pokemonDetails))}>add</button>
              {myPokemon.name && (
                <Link to="/fight" className="btn btn-primary" onClick={() => handleFight(pokemonDetails)}>fight</Link>
              )}
            </div>
            </div>
            <Link to="/pokedex" onClick={() => dispatch(eraseState())} className="btn btn-primary">Back</Link>
        </div>
    )}
    {error && (
        <h1>{error}</h1>
    )}
    {(!pokemonDetails.name) && (!pokemonDescription.color) && (loading === false) && (
      <>
        <h1>Error: Pokemon not Found</h1>
        <Link to='/pokedex' className="btn btn-dark btn-lg">Back</Link>
      </>
    )}
</div>
  )
}

export default PokemonDetails
