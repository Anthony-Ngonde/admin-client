import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Payment from './components/Payment/Payment';
import Members from './components/Members/Members';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
