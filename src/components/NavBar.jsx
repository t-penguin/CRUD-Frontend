import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBarStyles.css";

const NavBar = ({ loggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/campuses" className="nav-link">Campuses</NavLink>
        <NavLink to="/students" className="nav-link"> Students</NavLink>
        { !loggedIn && <NavLink to="/login" className="nav-link"> Login</NavLink> }
        { !loggedIn && <NavLink to="/signup" className="nav-link"> Signup</NavLink> }
      </div>
    </nav>
  );
};


export default NavBar;