import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Payment from './components/Payment/Payment'
import Equipment from './components/Equipment/Equipment'
import Members from './components/Members/Members'

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/hello')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMessage(data.message)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/members" element={<Members />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
