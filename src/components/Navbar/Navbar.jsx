import React from 'react';

import { SERVER_URL } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = ({ email }) => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        navigate('/login');
      } else if (response.status === 401) {
        navigate('/login');
      }
    } catch (error) {
      toast.error('Please try again');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <User className="user-icon" />
        <div className="nav-title">
          <h2>TeeFlex Admin</h2>
          <p>{email}</p>
        </div>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/members"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Users size={20} />
            <span>Members</span>
          </Link>
        </li>
        <li>
          <Link
            to="/payments"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <CreditCard size={20} />
            <span>Payment</span>
          </Link>
        </li>
      </ul>

      <div className="nav-footer">
        <button className="logout-link" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
