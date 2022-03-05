import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eraseState, isLoading, addEnemyPokemon, sumMyStats, sumEnemyStats } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import EnemyPokemon from '../EnemyPokemon'
import MyPokemon from '../myPokemon'
import pokemonType from '../../Assets/pokemontypes'
import Fight from './fight';

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

  let handleOpponent = () => {
    setButtonText('Fight')
    dispatch(isLoading(true))
    dispatch(addEnemyPokemon())
}

  function fight() {
    setButtonText('Try Again')
    dispatch(sumMyStats(myPokemon))
    dispatch(sumEnemyStats(enemyPokemon))
    strong()
    lucky()
    if(isStrong && isLucky) {
      setResults('Your Pokemon type is favorable and got lucky!!!')
      let bonus = 70
      setTotalStats(totalStats => myStats + bonus)
    } else if (isWeak && isLucky) {
      setResults('Your Pokemon type is unfavorable but got lucky!!!')
      let bonus = 30
      setTotalStats(totalStats => myStats + bonus)
    } else if (isLucky) {
      setResults('Your Pokemon got lucky!!!')
      let bonus = 50
      setTotalStats(totalStats => myStats + bonus)
    } else if (isStrong) {
      setResults('Your Pokemon type is favorable!')
      let bonus = 20
      setTotalStats(totalStats => myStats + bonus)
    } else if (isWeak){
      setResults('Your Pokemon type is unfavorable!')
      let bonus = 20
      setTotalStats(totalStats => myStats - bonus)
    } else {
      setTotalStats(totalStats => myStats )
      setResults('Both fights in the same conditions!')
    }
  }

  useEffect(() => {
    if(enemyPokemon.name){
      setIsStrong(false)
      setIsWeak(false)
      dispatch(sumMyStats(myPokemon))
      dispatch(sumEnemyStats(enemyPokemon))
      strong()
      lucky()
    }
    return;
  }, [enemyPokemon])

  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <MyPokemon />
        <h1>VS</h1>
        <EnemyPokemon />
      </div>
      <div>
        <Link to="/" onClick={() => dispatch(eraseState())} className="btn btn-primary">Back</Link>
        <button className="btn btn-primary" onClick={() => fight()} data-bs-toggle="modal" data-bs-target="#exampleModal">{buttonText}</button>
        <button className="btn btn-primary" onClick={() => handleOpponent()}>Change Opponent</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Results of the Fight</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Fight
                  results={results}
                  myStats={totalStats}
                  enemyStats={enemyStats}
                  pokemonName={myPokemon.name}
                  enemyPokemonName={enemyPokemon.name}
                  />
                <div className="d-flex flex-column w-50">
                  <button className="btn btn-primary" onClick={() => showText()}>How it works?</button>
                    {showHow && (
                      <span>Total Power of Pokemons is calculated based in three main Attributes and the Bonus.
                        The first and second attributes are Hp and Speed but the third one is random among the remaining four.
                        The bonus depends on the effectiveness of the type and if you are lucky. Effectivenes Type gives you +20 and luck +50.
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
  )
}

export default Battle
