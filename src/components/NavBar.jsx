import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-links">
        <Link to="/campuses" className="nav-link">Campuses</Link>
        <Link to="/students" className="nav-link"> Students</Link>
        <Link to="/login" className="nav-link"> Login</Link>
        <Link to="/signup" className="nav-link"> Signup</Link>
      </div>
    </nav>
  );
};


export default NavBar;