import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css'
import pokemonType from '../../Assets/pokemontypes'

function PokemonDetails() {
  const [pokemonWeak, setWeak] = useState()
  const [pokemonStrong, setStrong] = useState()
  const pokemonDetails = useSelector(store => store.pokedex.pokemonDetails)
  console.log(pokemonDetails)
  const loading = useSelector(store => store.pokedex.loading)
  const error = useSelector(store => store.pokedex.error)

  const typeRelation = () => {
    let type = []
    let weak = []
    let strong = []

    pokemonDetails.types.map((types) =>(
      type.push(pokemonType[types.type.name].name),
      weak.push(pokemonType[types.type.name].weak),
      strong.push(pokemonType[types.type.name].strong)
      ))
      if(weak.length > 1){
        const totalWeak = weak[0].concat(weak[1]).filter(val => !type.includes(val))
        const totalStrong = strong[0].concat(strong[1]).filter(val => !type.includes(val))
        let diffWeak = totalWeak.filter(val => !totalStrong.includes(val));
        let diffStrong = totalStrong.filter(val => !totalWeak.includes(val));
        console.log(diffStrong)
        console.log(diffWeak)
        diffStrong = [...new Set(diffStrong)]
        diffWeak = [...new Set(diffWeak)]
        return setStrong(diffStrong),
        setWeak(diffWeak)
      } else {
        const totalWeak = weak[0]
        const totalStrong = strong[0]
        console.log(totalWeak)
        console.log(totalStrong)
        return setStrong(totalStrong),
        setWeak(totalWeak)
      }

  }

  useEffect(() => {
    let time = setTimeout(() => typeRelation(), 3000);
    return () => {
      clearTimeout(time);
    };
  }, [pokemonDetails])



  return (
    <div className="d-flex flex-column">
    { loading === true && (
    <div className="d-flex justify-content-center m-3">
        <div className="spinner-border" role="status" />
    </div>
  )}
    { pokemonDetails.name && loading === false && (
        <div className="d-flex flex-column align-items-center">
            <h1>{pokemonDetails.name}</h1>
            <div className="pokemon-infograph d-flex">
              <div className="d-flex flex-column">
                {pokemonDetails.types.map((types) =>(
                  <img className="pokemon-type_img" src={pokemonType[types.type.name].img}/>
                  ))}
              </div>
              <img className="pokemon-details_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`} alt={pokemonDetails.name}/>
              <div>
                <span>strong against</span>
                <div className="d-flex">
                  {!pokemonStrong && (
                  <div className="d-flex justify-content-center m-3">
                    <div className="spinner-border" role="status" />
                  </div>
                  )}
                  { pokemonStrong && (
                    pokemonStrong.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img}/>
                    ))
                  )}
                </div>
                <span>weak against</span>
                <div className="d-flex">
                  {!pokemonWeak && (
                  <div className="d-flex justify-content-center m-3">
                    <div className="spinner-border" role="status" />
                  </div>
                  )}
                  { pokemonWeak && (
                    pokemonWeak.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img}/>
                    ))
                  )}
                </div>
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
            <Link to="/" className="btn btn-warning">Back</Link>
        </div>
    )}
    {error && (
        <h1>{error}</h1>
    )}
    {(!pokemonDetails) && (loading === false) && (
      <>
        <h1>Error: Pokemon not Found</h1>
        <Link to='/' className="btn btn-dark btn-lg">Back</Link>
      </>
    )}
</div>
  )
}

export default PokemonDetails
