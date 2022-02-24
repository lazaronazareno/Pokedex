import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, isLoading, sumNum, decNum, getDetails } from '../../Redux/reducers';
import './styles.css'

function PokemonList() {
  const dispatch = useDispatch();

  const pokemonList = useSelector(store => store.pokedex.pokemonList)
  const error = useSelector(store => store.pokedex.error)
  const loading = useSelector(store => store.pokedex.loading)
  const numberPage = useSelector(store => store.pokedex.numberPage)

  useEffect(() => {
    dispatch(isLoading())
    dispatch(getPokemons(numberPage))
    return ;
// eslint-disable-next-line
    }, [numberPage])

    const newIndex = (id) => {
      let pokemonIndex = 0
      if(numberPage ===  1){
        pokemonIndex = id + 1
        return pokemonIndex;
      } else if(numberPage > 1) {
        pokemonIndex =id + 1+ 18*(numberPage-1) 
        return pokemonIndex;
      }else{
        return;
      }
    }

    let handleDetails = (id) => {
      dispatch(isLoading())
      dispatch(getDetails(id))
  }

  return (
    <div className="pokemonlist_container">
      {loading === true && (
        <div className="d-flex justify-content-center m-3">
          <div className="spinner-border" role="status" />
        </div>
      )}
      {pokemonList.map((pokemon, index) => (
        <div className="pokemonlist_card d-flex flex-column border border-dark" key={pokemon.name}>
          <span className="text-wrap">{pokemon.name}</span>
          <img className="pokemon_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newIndex(index)}.png`} alt={pokemon.name}/>
          <div className="d-flex justify-content-evenly">
            <Link to={`/details/${newIndex(index)}`} className="btn btn-dark" id={newIndex(index)} onClick={() => handleDetails(newIndex(index))}>Details</Link>
          </div>
        </div>
      ))}
      <div className="container d-flex justify-content-evenly p-2">
        { numberPage > 1 && loading === false && (
            <button className="btn btn-lg btn-dark" onClick={() => dispatch(decNum(numberPage))}>Prev Page</button>
        )}
        { loading === false && (
            <span className="fs-4">Page {numberPage}</span>
        )}
        { numberPage < 30 && loading === false && (
            <button className="btn btn-lg btn-dark" onClick={() => dispatch(sumNum(numberPage))}>Next Page</button>
        )}
      </div>
    </div>
  )
}

export default PokemonList;