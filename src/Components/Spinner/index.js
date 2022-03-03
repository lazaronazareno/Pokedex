import React from 'react'
import pokeball from '../../Assets/pokeball.png'

function Spinner() {
  return (
    <div className="d-flex justify-content-center align-content-center m-3">
      <img src={pokeball} alt="pokeball" className="spinner-grow" role="status" />
    </div>
  )
}

export default Spinner
