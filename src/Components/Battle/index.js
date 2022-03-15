import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eraseState, isLoading, addEnemyPokemon, sumMyStats, sumEnemyStats } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import EnemyPokemon from '../EnemyPokemon'
import MyPokemon from '../myPokemon'
import pokemonType from '../../Assets/pokemontypes'
import Fight from './fight'
import './styles.scss'

function Battle() {
  const dispatch = useDispatch();
  const [isStrong, setIsStrong] = useState(false)
  const [isWeak, setIsWeak] = useState(false)
  const [isLucky, setIsLucky] = useState(false)
  const [results, setResults] = useState(null)
  const [showHow, setShowHow] = useState(false)
  const [buttonText, setButtonText] = useState('Fight')
  const [totalStats, setTotalStats] = useState(0)
  const myPokemon = useSelector(store => store.pokedex.myPokemon)
  const enemyPokemon = useSelector(store => store.pokedex.enemyPokemon)
  const pokemonStrong = useSelector(store => store.pokedex.pokemonStrong)
  const pokemonWeak = useSelector(store => store.pokedex.pokemonWeak)  
  const myStats = useSelector(store => store.pokedex.myPokemonStats)  
  const enemyStats = useSelector(store => store.pokedex.enemyPokemonStats)  
  const loading = useSelector(store => store.pokedex.loading)  
  const error = useSelector(store => store.pokedex.error)  
  
  function strong() {
    let enemyType = []

    enemyPokemon.types.map((types) =>(
      enemyType.push(pokemonType[types.type.name].name)
    ))
      if(pokemonStrong.includes(enemyType[0] || enemyType[1])){
        console.log('strong true')
        return setIsStrong(true)
      } else if (pokemonWeak.includes(enemyType[0] || enemyType[1])) {
        console.log('weak true')
        return setIsWeak(true)
      } else { return }
  }

  function lucky() {
    const min = Math.floor(1)
    const max = Math.floor(100)
    const randomNumber = Math.floor(Math.random() * (max - min +1)) +min
    const luckyNumber = [1, 7, 77]
    if (luckyNumber.includes(randomNumber)) {
      setIsLucky(true)
      return true
    } else {
      setIsLucky(false)
      return false
    }
  }

  const showText = () => {
    setShowHow(!showHow)
  }

  function handleOpponent() {
    setButtonText('Fight')
    dispatch(isLoading(true))
    dispatch(addEnemyPokemon())
}

  function fight() {
    setIsStrong(false)
    setIsWeak(false)
    setButtonText('Try Again')
    strong()
    lucky()
    dispatch(sumMyStats(myPokemon))
    dispatch(sumEnemyStats(enemyPokemon))
    if(isStrong && isLucky) {
      setResults('Your Pokemon type is favorable and got lucky!!!')
      let bonus = 140
      setTotalStats(totalStats => myStats + bonus)
    } else if (isWeak && isLucky) {
      setResults('Your Pokemon type is unfavorable but got lucky!!!')
      let bonus = 60
      setTotalStats(totalStats => myStats + bonus)
    } else if (isLucky) {
      setResults('Your Pokemon got lucky!!!')
      let bonus = 100
      setTotalStats(totalStats => myStats + bonus)
    } else if (isStrong) {
      setResults('Your Pokemon type is favorable!')
      let bonus = 40
      setTotalStats(totalStats => myStats + bonus)
    } else if (isWeak){
      setResults('Your Pokemon type is unfavorable!')
      let bonus = 40
      setTotalStats(totalStats => myStats - bonus)
    } else {
      setTotalStats(totalStats => myStats )
      setResults('Both fights in the same conditions!')
    }
  }

  useEffect(() => {
    if(myPokemon.name && enemyPokemon.name){
      setIsStrong(false)
      setIsWeak(false)
      strong()
      lucky()
      dispatch(sumMyStats(myPokemon))
      dispatch(sumEnemyStats(enemyPokemon))
    }
    return;
  }, [enemyPokemon])

  return (
    <div>
    { (myPokemon.name) && (error === null) && (
      <div className="battle-container">
        <div className="battle-pokemons d-flex justify-content-evenly">
          <div className="battle-mypokemon d-flex flex-column">
            <MyPokemon myPokemon={myPokemon} />
          </div>
          <h1 className="battle-vs align-self-center">VS</h1>
          <div className="battle-enemypokemon d-flex flex-column">
            <EnemyPokemon />
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-evenly">
            <Link to="/" onClick={() => dispatch(eraseState())} className="btn btn-dark">Back</Link>
            <button className="btn btn-dark" onClick={() => fight()} data-bs-toggle="modal" data-bs-target="#exampleModal">{buttonText}</button>
            <button className="btn btn-dark" onClick={() => handleOpponent()}>Change Opponent</button>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Results of the Fight</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <Fight 
                    loading={loading}
                    results={results}
                    myStats={totalStats}
                    enemyStats={enemyStats}
                    pokemonName={myPokemon.name}
                    enemyPokemonName={enemyPokemon.name}
                    />
                  <div className="d-flex flex-column">
                    <button className="btn btn-light" onClick={() => showText()}>How it works?</button>
                      {showHow && (
                        <span>Total Power of Pokemons is calculated based in three main Attributes and the Bonus.
                          The first and second attributes are Hp and Speed but the third one is random among the remaining four.
                          The bonus depends on the effectiveness of the type and if you are lucky. Effectivenes Type adds/removes you 40 points and luck +100.
                          Lucky has a 3% chance of appearing.
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      { (!myPokemon.name) && (
        <div className="battle-container-error">
          <div className="battle-container-error__div">
            <h1>There is nothing... you can fight when you choose your pokemon</h1>
            <Link to="/pokedex" onClick={() => dispatch(eraseState())} className="btn btn-dark">Choose Pokemon</Link>
            <Link to="/" onClick={() => dispatch(eraseState())} className="goBackButton btn btn-dark">Back</Link>
          </div>
        </div>
      )}
      {(error) && (
        <div className="battle-container-error">
          <div className="battle-container-error__div">
            <h1>{error}</h1>
            <Link to="/" onClick={() => dispatch(eraseState())} className="btn btn-dark">Back</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Battle
