import React, { useState, useEffect } from 'react'
import './App.css'



const App = () => {

  useEffect(
    ()=>{
      fetch('http://localhost:5000/hello')
      .then(response=>response.json())
      .then(data=>console.log(data))
    },[]
  )

  const [message, setMessage] = useState('')
  return (
    <div className='app'>
      {message}
    </div>
  )
}

export default App

