import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eraseState, isLoading, addEnemyPokemon } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import EnemyPokemon from '../EnemyPokemon'
import MyPokemon from '../myPokemon'
import pokemonType from '../../Assets/pokemontypes'
import Fight from './fight';

function Battle() {
  const dispatch = useDispatch();
  const [myTotalStats, setMyTotalStats] = useState(0)
  const [enemyTotalStats, setEnemyTotalStats] = useState(0)
  const [isStrong, setIsStrong] = useState(false)
  const [isWeak, setIsWeak] = useState(false)
  const [isLucky, setIsLucky] = useState(false)
  const [results, setResults] = useState(null)
  const [showHow, setShowHow] = useState(false)
  const [buttonText, setButtonText] = useState('Fight')
  const myPokemon = useSelector(store => store.pokedex.myPokemon)
  const enemyPokemon = useSelector(store => store.pokedex.enemyPokemon)
  
    function sumMyStats() {
      let myPokemonStats = []
      let myStats = []
      myPokemon.stats.map((stats) =>(
          myPokemonStats.push(stats.base_stat)
      ))
      let myHp = myPokemonStats.splice(0,1)
      let mySpeed = myPokemonStats.splice(-1,1)
      let myRandomStat = myPokemonStats[Math.floor(Math.random() * myPokemonStats.length)];
      myStats.push(myHp[0])
      myStats.push(mySpeed[0])
      myStats.push(myRandomStat) 
      const mySum = myStats.reduce((partialSuma, b) => partialSuma + b, 0)

      return setMyTotalStats(mySum)
    }

    function sumEnemyStats() {
      let enemyPokemonStats = []
      let enemyStats = []
      enemyPokemon.stats.map((stats) =>(
        enemyPokemonStats.push(stats.base_stat)
    ))
      let enemyHp = enemyPokemonStats.splice(0,1)
      let enemySpeed = enemyPokemonStats.splice(-1,1)
      let enemyRandomStat = enemyPokemonStats[Math.floor(Math.random() * enemyPokemonStats.length)];
      enemyStats.push(enemyHp[0])
      enemyStats.push(enemySpeed[0])
      enemyStats.push(enemyRandomStat) 
      const enemySum = enemyStats.reduce((partialSum, a) => partialSum + a, 0)

      return setEnemyTotalStats(enemySum)
    }
  
  function strong() {
    let myType = []
    let enemyType = []
    let strong = []
    let weak = []

    myPokemon.types.map((types) =>(
      (myType.push(pokemonType[types.type.name].name),
      strong.push(pokemonType[types.type.name].strong),
      weak.push(pokemonType[types.type.name].weak))
      ));
    enemyPokemon.types.map((types) =>(
      enemyType.push(pokemonType[types.type.name].name)
    ))
      if(strong.length > 1){
        let totalWeak = weak[0].concat(weak[1]).filter(val => !myType.includes(val))
        let totalStrong = strong[0].concat(strong[1]).filter(val => !myType.includes(val))
        console.log(totalWeak)
        console.log(totalStrong)
        totalWeak = [...new Set(totalWeak)]
        totalStrong = [...new Set(totalStrong)]
        console.log(totalWeak)
        console.log(totalStrong)
        let resultStrong = totalStrong.includes(enemyType[0] || enemyType[1])
        let resultWeak = totalWeak.includes(enemyType[0] || enemyType[1])
        console.log(resultStrong)
        console.log(resultWeak)
        return (setIsStrong(resultStrong), setIsWeak(resultWeak))
      } else {
        const totalStrong = strong[0]
        const totalWeak = weak[0]
        let resultStrong = totalStrong.includes(enemyType[0])
        let resultWeak = totalWeak.includes(enemyType[0])

        return (setIsStrong(resultStrong), setIsWeak(resultWeak))
      }   
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
    sumMyStats()
    sumEnemyStats()
    strong()
    lucky()
    if(isStrong && isLucky) {
      setResults('Your Pokemon type is favorable and got lucky!!!')
      let bonus = 70
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
    } else if (isWeak && isLucky) {
      setResults('Your Pokemon type is unfavorable but got lucky!!!')
      let bonus = 30
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
    } else if (isLucky) {
      setResults('Your Pokemon got lucky!!!')
      let bonus = 50
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
    } else if (isStrong) {
      setResults('Your Pokemon type is favorable!')
      let bonus = 20
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
    } else if (isWeak){
      setResults('Your Pokemon type is unfavorable!')
      let bonus = 20
      setMyTotalStats(myTotalStats => myTotalStats - bonus)
    } else {
      setResults('Both fights in the same conditions!')
    }
  }

  useEffect(() => {
    if(enemyPokemon.name){
      sumMyStats()
      sumEnemyStats()
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
                  myStats={myTotalStats}
                  enemyStats={enemyTotalStats}
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
