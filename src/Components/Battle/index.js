import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eraseState, isLoading } from '../../Redux/reducers';
import { Link } from 'react-router-dom';
import EnemyPokemon from '../EnemyPokemon'
import MyPokemon from '../myPokemon'
import pokemonType from '../../Assets/pokemontypes'

function Battle() {
  const dispatch = useDispatch();
  const [myTotalStats, setMyTotalStats] = useState(0)
  const [enemyTotalStats, setEnemyTotalStats] = useState(0)
  const [isStrong, setIsStrong] = useState(false)
  const [isWeak, setIsWeak] = useState(false)
  const [isLucky, setIsLucky] = useState(false)
  const [results, setResults] = useState(null)
  const [victory, setVictory] = useState(false)
  const myPokemon = useSelector(store => store.pokedex.myPokemon)
  const enemyPokemon = useSelector(store => store.pokedex.enemyPokemon)
  const loading = useSelector(store => store.pokedex.loading)
  
    function sumMyStats() {
      dispatch(isLoading(true))
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

      console.log(mySum)
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

      console.log(enemySum)
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
        totalWeak = [...new Set(totalWeak)]
        totalStrong = [...new Set(totalStrong)]
        console.log(totalStrong)
        console.log(totalWeak)
        console.log(enemyType)
        let resultStrong = totalStrong.includes(enemyType[0] || enemyType[1])
        let resultWeak = totalWeak.includes(enemyType[0] || enemyType[1])
        console.log('es mas fuerte? : ', resultStrong)
        console.log('es mas debil? : ', resultWeak)
        return (setIsStrong(resultStrong), setIsWeak(resultWeak))
      } else {
        const totalStrong = strong[0]
        const totalWeak = weak[0]
        console.log(totalStrong)
        let resultStrong = totalStrong.includes(enemyType[0])
        let resultWeak = totalWeak.includes(enemyType[0])
        console.log('es mas fuerte? : ', resultStrong)
        console.log('es mas debil? : ', resultWeak)
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
    } else {
      setIsLucky(false)
    }
  }

  function fight() {
    sumMyStats()
    sumEnemyStats()
    dispatch(isLoading(false))
    strong()
    lucky()
    if(isStrong && isLucky) {
      dispatch(isLoading(false))
      setResults('Your Pokemon type is favorable(+20) and got lucky!!!(+50)')
      let bonus = 70
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
      setVictory(myTotalStats > enemyTotalStats)
    } else if (isWeak && isLucky) {
      dispatch(isLoading(false))
      setResults('Your Pokemon type is unfavorable(-20) but got lucky!!!(+50)')
      let bonus = 30
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
      setVictory(myTotalStats > enemyTotalStats)
    } else if (isLucky) {
      dispatch(isLoading(false))
      setResults('Your Pokemon got lucky!!!(+50)')
      let bonus = 50
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
      setVictory(myTotalStats > enemyTotalStats)
    } else if (isStrong) {
      dispatch(isLoading(false))
      setResults('Your Pokemon type is favorable!(+20)')
      let bonus = 20
      setMyTotalStats(myTotalStats => myTotalStats + bonus)
      setVictory(myTotalStats > enemyTotalStats)
    } else if (isWeak){
      dispatch(isLoading(false))
      setResults('Your Pokemon type is unfavorable!(-20)')
      let bonus = 20
      setMyTotalStats(myTotalStats => myTotalStats - bonus)
      setVictory(myTotalStats > enemyTotalStats)
    } else {
      dispatch(isLoading(false))
      setResults('Both Pokemons fight in the same conditions!(+0)')
      setVictory(myTotalStats > enemyTotalStats)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <MyPokemon />
        <h1>VS</h1>
        <EnemyPokemon />
      </div>
      <div>
        <Link to="/" onClick={() => dispatch(eraseState())} className="btn btn-primary">Back</Link>
        <button className="btn btn-primary" onClick={() => fight()}>fight</button>
        {results && loading === false && (
          <div>
            <h1>{results}</h1>
            <h1>Your Pokemon has {myTotalStats} of TotalPower</h1>
            <h1>Enemy Pokemon has {enemyTotalStats} of TotalPower</h1>
            <h1>{victory ? 'You Win!!' : 'You Lose!'}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Battle
