import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMyPokemon } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import './styles.scss'
import '../../Assets/color.scss'
import pokemonType from '../../Assets/pokemontypes'

function PokemonDetails() {
  const dispatch = useDispatch();

  const [pokemonWeak, setWeak] = useState()
  const [pokemonStrong, setStrong] = useState()
  const pokemonDetails = useSelector(store => store.pokedex.pokemonDetails)
  const pokemonDescription = useSelector(store => store.pokedex.pokemonDescription)
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
// eslint-disable-next-line
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
            <div className={`pokemon-infograph d-flex ${pokemonDescription.color.name}`}>
              <div className="d-flex flex-column">
                {pokemonDetails.types.map((types) =>(
                  <img className="pokemon-type_img" src={pokemonType[types.type.name].img} key={types.type.name} alt={types.type.name}/>
                  ))}
              </div>
              <img className="pokemon-details_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`} alt={pokemonDetails.name}/>
              <div className="weakness-container d-flex flex-column">
                <h1>Strong against</h1>
                <div className="d-flex flex-wrap">
                  {!pokemonStrong && (
                  <div className="d-flex justify-content-center m-3">
                    <div className="spinner-border" role="status" />
                  </div>
                  )}
                  { pokemonStrong && (
                    pokemonStrong.map((types) =>(
                      <img className="pokemon-type_img" src={pokemonType[types].img} alt={pokemonType[types].name}/>
                    ))
                  )}
                </div>
                <h1>Weak against</h1>
                <div className="d-flex flex-wrap">
                  {!pokemonWeak && (
                  <div className="d-flex justify-content-center m-3">
                    <div className="spinner-border" role="status" />
                  </div>
                  )}
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
              <button onClick={() => dispatch(addMyPokemon(pokemonDetails))}>add</button>
              <button>fight</button>
            </div>
            </div>
            <Link to="/pokedex" className="btn btn-warning">Back</Link>
        </div>
    )}
    {error && (
        <h1>{error}</h1>
    )}
    {(!pokemonDetails) && (loading === false) && (
      <>
        <h1>Error: Pokemon not Found</h1>
        <Link to='/pokedex' className="btn btn-dark btn-lg">Back</Link>
      </>
    )}
</div>
  )
}

export default PokemonDetails
