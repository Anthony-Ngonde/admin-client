import React from "react";
import "./Navbar.css";
import { FaUser, FaTachometerAlt, FaUsers, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-header">
        <FaUser className="user-icon" />
        <h3>TeeFlex Admin</h3>
        <p>admin@gmail.com</p>
      </div>
      <div className="navbar-links">
        <div className="navbar-link">
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </div>
        <div className="navbar-link">
          <FaUsers className="icon" />
          <span>Members</span>
        </div>
        <div className="navbar-link">
          <FaMoneyBill className="icon" />
          <span>Payment</span>
        </div>
        <div className="navbar-link logout">
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
