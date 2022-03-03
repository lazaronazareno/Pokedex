import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { searchPokemon, isLoading, eraseState } from '../../Redux/reducers'
import './styles.scss'


function Search() {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    search: '',
  });
  const searchPokemonList = useSelector(store => store.pokedex.searchPokemonList)
  const error = useSelector(store => store.pokedex.error)
  const loading = useSelector(store => store.pokedex.loading)

  let handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };
    
  let handleSubmit = async event => {
    event.preventDefault();
    dispatch(isLoading(true))
    dispatch(searchPokemon(form.search))
    };


  return (
    <div>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <h1>Search</h1>
        <div className="form-floating mb-3">
          <input
            name="search"
            id="floatingInput"
            className="form-control form-control-lg"
            type="text"
            onChange={handleInput}
            />
          <label htmlFor="floatingInput">Pokemon Name/Number : </label>
        </div>
        <button className="btn btn-primary btn-lg mb-3" type="submit" >
            Search
        </button>
      </form>
      <div className="d-flex flex-column align-content-center">
      {loading === true && (
        <div className="d-flex justify-content-center m-3">
          <div className="spinner-border" role="status" />
        </div>
      )}
      { searchPokemonList.name && loading === false && !error && (
        <div className="d-flex flex-column align-items-center" key={searchPokemonList.id}>
          <img className="search-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchPokemonList.id}.png`} alt={searchPokemonList.name}/>
          <h1>{searchPokemonList.name}</h1>
          <h2>{searchPokemonList.id}</h2>
        </div>
        )}
        {error && (
          <h1>{error}</h1>
        )}
        <Link to='/' className="btn btn-dark btn-lg" onClick={() => dispatch(eraseState())}>Back</Link>
      </div>
    </div>
  )
}

export default Search
