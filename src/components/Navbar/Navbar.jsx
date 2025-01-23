import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, LogOut, User } from 'lucide-react';

const Navbar = ({ email }) => {
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
        <Link to="/logout" className="logout-link">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { FaUser, FaTachometerAlt, FaUsers, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="navbar-header">
//         <FaUser className="user-icon" />
//         <h3>TeeFlex Admin</h3>
//         <p>admin@gmail.com</p>
//       </div>
//       <div className="navbar-links">
//         <Link to="/" className="navbar-link">
//           <FaTachometerAlt className="icon" />
//           <span>Dashboard</span>
//         </Link>
//         <Link to="/members" className="navbar-link">
//           <FaUsers className="icon" />
//           <span>Members</span>
//         </Link>
//         {/* Added Link for Payment */}
//         <Link to="/payment" className="navbar-link">
//           <FaMoneyBill className="icon" />
//           <span>Payment</span>
//         </Link>
//         <div className="navbar-link logout">
//           <FaSignOutAlt className="icon" />
//           <span>Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
