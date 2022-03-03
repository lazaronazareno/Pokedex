import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addEnemyPokemon, addMyPokemon, eraseState, isLoading } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import './styles.scss'
import '../../Assets/color.scss'
import pokemonType from '../../Assets/pokemontypes'
import Spinner from '../Spinner';

function PokemonDetails() {
  const dispatch = useDispatch();

  const [pokemonWeak, setWeak] = useState()
  const [pokemonStrong, setStrong] = useState()
  const pokemonDetails = useSelector(store => store.pokedex.pokemonDetails)
  const pokemonDescription = useSelector(store => store.pokedex.pokemonDescription)
  const myPokemon = useSelector(store => store.pokedex.myPokemon)
  const loading = useSelector(store => store.pokedex.loading)
  const error = useSelector(store => store.pokedex.error)

  const typeRelation = () => {
    let type = []
    let weak = []
    let strong = []

    pokemonDetails.types.map((types) =>(
      (type.push(pokemonType[types.type.name].name),
      weak.push(pokemonType[types.type.name].weak),
      strong.push(pokemonType[types.type.name].strong))
      ))
      if(weak.length > 1){
        const totalWeak = weak[0].concat(weak[1]).filter(val => !type.includes(val))
        const totalStrong = strong[0].concat(strong[1]).filter(val => !type.includes(val))
        let diffWeak = totalWeak.filter(val => !totalStrong.includes(val));
        let diffStrong = totalStrong.filter(val => !totalWeak.includes(val));
        diffStrong = [...new Set(diffStrong)]
        diffWeak = [...new Set(diffWeak)]
        return (setStrong(diffStrong),
        setWeak(diffWeak))
      } else {
        const totalWeak = weak[0]
        const totalStrong = strong[0]

        return (setStrong(totalStrong),
        setWeak(totalWeak))
      }

  }

  let handleFight = (pokemon) => {
    dispatch(isLoading(true))
    dispatch(addMyPokemon(pokemon))
    dispatch(isLoading(true))
    dispatch(addEnemyPokemon())
}

  useEffect(() => {
    let time = setTimeout(() => typeRelation(), 3500);
    return () => {
      clearTimeout(time);
    };
// eslint-disable-next-line
  }, [pokemonDetails])



  return (
    <div className="d-flex flex-column">
    { loading === true && !pokemonDetails.name && (
      <Spinner />
  )}
    { pokemonDetails.name !== undefined && loading === false && pokemonDescription.color !== undefined && (
        <div className="pokemon-details d-flex flex-column align-items-center">
            <h1 h1 className="pokemon-name">{pokemonDetails.name} - #{pokemonDetails.id}</h1>
            <div className={`pokemon-infograph d-flex ${pokemonDescription.color.name}`}>
              <div className="d-flex flex-column">
                {pokemonDetails.types.map((types) =>(
                  <img className="pokemon-type_img" src={pokemonType[types.type.name].img} key={types.type.name} alt={types.type.name}/>
                  ))}
              </div>
              <img className="pokemon-details_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`} alt={pokemonDetails.name}/>
              <div className="weakness-container d-flex flex-column">
                <h1>Strong against</h1>
                <div className="d-flex flex-wrap">
                  {!pokemonStrong && ( <Spinner /> )}
                  { pokemonStrong && (
                    pokemonStrong.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img} key={pokemonType[types].name} alt={pokemonType[types].name}/>
                    ))
                  )}
                </div>
                <h1>Weak against</h1>
                <div className="d-flex flex-wrap">
                  {!pokemonWeak && ( <Spinner />)}
                  { pokemonWeak && (
                    pokemonWeak.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img} alt={pokemonType[types].name}/>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="pokemon-stats-info d-flex">
              <div className="pokemon-stats d-flex flex-column">
                <h1>Base Stats</h1>
                {pokemonDetails.stats.map((stats) =>(
                  <div className="pokemon-meter d-flex justify-content-between">
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
    {(!pokemonDetails.name) && (loading === false) && (
      <>
        <h1>Error: Pokemon not Found</h1>
        <Link to='/pokedex' className="btn btn-dark btn-lg">Back</Link>
      </>
    )}
</div>
  )
}

export default PokemonDetails
