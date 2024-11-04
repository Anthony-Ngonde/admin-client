import React from 'react'
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-container">
          {/* Placeholder for logo */}
          <div className="logo-placeholder"></div>
          <span className="gym-name">Focus Fitness</span>
        </div>
      </div>

      {/* Mobile menu button */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger"></span>
      </button>

      {/* Navigation links */}
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <a href="/" className="nav-link">Home</a>
        <a href="/payment" className="nav-link">Payment</a>
        <a href="/equipment" className="nav-link">Equipment</a>
        <a href="/members" className="nav-link">View Members</a>
      </div>
    </nav>
  )
}

export default Navbar