import React from 'react';

import { SERVER_URL } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, User } from 'lucide-react';

import {FaTimes} from 'react-icons/fa'
import toast from 'react-hot-toast';

const Navbar = ({ email,isOpen,onClose }) => {
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
    <aside className={`fixed inset-y-0 left-0 w-64 bg-[#131312] dark:bg-gray-900 text-white p-4 md:p-6 z-30 shadow-lg transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out md:translate-x-0`}>
     <button
          className="md:hidden text-white text-2xl self-end mb-4"
          onClick={onClose}
        >
          <FaTimes />
        </button>
    <div className="p-6 text-lg font-bold border-b border-gray-700">
      <User className="w-10 h-10 text-gray-300" />
      <div>
        <h2 className="text-xl font-semibold">TeeFlex Admin</h2>
        <p className="text-sm text-gray-400 truncate">{email}</p>
      </div>
    </div>
  
    <ul className="flex-1 space-y-2 mt-4 px-4">
      <li>
        <Link
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to="/members"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <Users size={20} />
          <span className="text-sm font-medium">Members</span>
        </Link>
      </li>
      <li>
        <Link
          to="/payments"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <CreditCard size={20} />
          <span className="text-sm font-medium">Payment</span>
        </Link>
      </li>
    </ul>
  
    <div className="p-4 border-t border-gray-700">
      <button
        className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
        onClick={handleLogout}
      >
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  </aside>
  
  );
};

export default Navbar;
