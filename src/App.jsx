import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import{
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'



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
    <Router>
      <div className='app'>
      <Navbar />
      <Switch>
        
      </Switch>
    </div>
    </Router>
    
  )
}

export default App

