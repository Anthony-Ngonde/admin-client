import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-container">
          {/* Placeholder for logo */}
          <div className="logo-placeholder"></div>
          <span className="gym-name">Teeflex Gym & Fitness Center</span>
        </div>
      </div>

      {/* Navigation links */}
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/payment" className="nav-link">Payment</Link>
        <Link to="/equipment" className="nav-link">Equipment</Link>
        <Link to="/members" className="nav-link">View Members</Link>
      </div>

      {/* Logout button */}
      <div className="logout-container">
        <button className="logout-button">
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile menu button */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger"></span>
      </button>
    </nav>
  )
}

export default Navbar