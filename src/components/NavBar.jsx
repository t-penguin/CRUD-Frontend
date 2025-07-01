import React from "react";
import { Link } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-links">
        <Link to="/campuses">Campuses</Link>
        <Link to="/students">Students</Link>
      </div>
    </nav>
  );
};


export default NavBar;