import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'



const App = () => {

  useEffect(
    ()=>{
      fetch('http://localhost:5000/hello')
      .then(response=>response.json())
      .then(data=>{console.log(data)
        setMessage(data.message)
      })
      .catch(err=>console.log(err))

     
    },[]
  )

  const [message, setMessage] = useState('')
  return (
    <div className='app'>
      {/* {message} */}
      <Navbar />
    </div>
  )
}

export default App

