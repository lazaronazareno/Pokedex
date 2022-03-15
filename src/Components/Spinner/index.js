import React from 'react'
import pokeball from '../../Assets/pokeball.png'
import './styles.scss'

function Spinner() {
  return (
    <div className="pokeball d-flex justify-content-center align-content-center">
      <img src={pokeball} alt="pokeball" className="spinner-grow" role="status" />
    </div>
  )
}

export default Spinner
