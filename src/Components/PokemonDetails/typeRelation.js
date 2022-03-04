import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function typeRelation() {
  const pokemonDetails = useSelector(store => store.pokedex.pokemonDetails)
  const [pokemonWeak, setWeak] = useState()
  const [pokemonStrong, setStrong] = useState()
  let type = []
  let weak = []
  let strong = []

  pokemonDetails.types.map((types) =>(
    (type.push(pokemonType[types.type.name].name),
    weak.push(pokemonType[types.type.name].weak),
    strong.push(pokemonType[types.type.name].strong))
    ))
    if(weak.length > 1){
      const totalWeak = weak[0].concat(weak[1]).filter(val => !type.includes(val))
      const totalStrong = strong[0].concat(strong[1]).filter(val => !type.includes(val))
      let diffWeak = totalWeak.filter(val => !totalStrong.includes(val));
      let diffStrong = totalStrong.filter(val => !totalWeak.includes(val));
      diffStrong = [...new Set(diffStrong)]
      diffWeak = [...new Set(diffWeak)]
      return (setStrong(diffStrong),
      setWeak(diffWeak))
    } else {
      const totalWeak = weak[0]
      const totalStrong = strong[0]

      return (setStrong(totalStrong),
      setWeak(totalWeak))
    }
}


export default typeRelation