import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { searchPokemon, addMyPokemon, isLoading, eraseState } from '../../Redux/reducers'
import MyPokemon from '../myPokemon';
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
    <div className="d-flex flex-column align-items-center justify-content-center">
      <form className="search-container d-flex flex-column" onSubmit={handleSubmit}>
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
      <div className="d-flex flex-column align-content-center">
      {loading === true && (
        <div className="d-flex justify-content-center m-3">
          <div className="spinner-border" role="status" />
        </div>
      )}
      { searchPokemonList.name && loading === false && !error && (
        <>
          <MyPokemon myPokemon ={searchPokemonList} />
          <button className="btn btn-primary" onClick={() => dispatch(addMyPokemon(searchPokemonList))}>add</button>
        </>
        )}
        {error && (
          <h1>{error}</h1>
        )}
        <Link to='/' className="goBackButton btn btn-primary btn-lg" onClick={() => dispatch(eraseState())}>Back</Link>
      </div>
      </form>
    </div>
  )
}

export default Search
