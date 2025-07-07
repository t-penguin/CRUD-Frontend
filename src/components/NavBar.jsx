import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/campuses">Campuses</NavLink>
        <NavLink to="/students">Students</NavLink>
      </div>
    </nav>
  );
};


export default NavBar;