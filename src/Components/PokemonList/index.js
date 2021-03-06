import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, isLoading, sumNum, decNum, getDetails, getDescription } from '../../Redux/reducers';
import './styles.scss'
import Spinner from '../Spinner';
import MenuPokemonList from './menu';

function PokemonList() {
  const dispatch = useDispatch();

  const pokemonList = useSelector(store => store.pokedex.pokemonList)
  const error = useSelector(store => store.pokedex.error)
  const loading = useSelector(store => store.pokedex.loading)
  const numberPage = useSelector(store => store.pokedex.numberPage)

  useEffect(() => {
    dispatch(isLoading(true))
    dispatch(getPokemons(numberPage))
    return ;
// eslint-disable-next-line
    }, [numberPage])

    const newIndex = (id) => {
      let pokemonIndex = 0
      if (pokemonList.length === 151) {
        pokemonIndex = id + 1
        return pokemonIndex;
      }
      else if(pokemonList.length === 100) {
        pokemonIndex = id + 151 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 135) {
        pokemonIndex = id + 251 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 107) {
        pokemonIndex = id + 386 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 156) {
        pokemonIndex = id + 493 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 72) {
        pokemonIndex = id + 649 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 88) {
        pokemonIndex = id + 721 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 89) {
        pokemonIndex = id + 809 + 1
        return pokemonIndex;
      } else if (pokemonList.length === 18) {
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
    }

    let handleDetails = (id) => {
      dispatch(isLoading(true))
      dispatch(getDescription(id))
      dispatch(getDetails(id))
  }

  return (
    <div className="pokemonList">
      {loading === true && (
        <Spinner />
      )}
      {loading === false && (
      <div className="padding">
        <h1>Pokemon List</h1>
        <MenuPokemonList />
        <div className="pokemonlist_container">
          {pokemonList.map((pokemon, index) => (
            <div className="pokemon-card_container" key={pokemon.name}>
              <Link to={`/details/${newIndex(index)}`} className="pokemonlist_card d-flex flex-column" id={newIndex(index)} onClick={() => handleDetails(newIndex(index))} alt={pokemon.name}>
                <img className="pokemon_image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newIndex(index)}.png`} alt={pokemon.name}/>
                <div className="another_card">
                  <span className="pokemon-name text-wrap">{pokemon.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to='/' className="goBackButton btn btn-primary btn-lg">Back</Link>
      </div>
      )}
      {error && (
        <h1>{error}</h1>
      )}
      <div className="container d-flex justify-content-evenly p-2">
        { pokemonList.length === 18 && numberPage > 1 && loading === false && (
            <button className="btn btn-lg btn-primary" onClick={() => dispatch(decNum(numberPage))}>Prev Page</button>
        )}
        { pokemonList.length === 18 && loading === false && (
            <span className="fs-4">Page {numberPage}</span>
        )}
        { pokemonList.length === 18 && numberPage < 45 && loading === false && (
            <button className="btn btn-lg btn-primary" onClick={() => dispatch(sumNum(numberPage))}>Next Page</button>
        )}
      </div>
    </div>
  )
}

export default PokemonList;