import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBarStyles.css";
import axios from "axios";

const NavBar = ({ loggedIn, setLoggedIn, API_URL }) => {
  const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`, { withCredentials: true });
    setLoggedIn(false);
    alert("Successfully logged out");
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/campuses" className="nav-link">Campuses</NavLink>
        <NavLink to="/students" className="nav-link">Students</NavLink>
        { !loggedIn && <NavLink to="/login" className="nav-link">Login</NavLink> }
        { !loggedIn && <NavLink to="/signup" className="nav-link">Signup</NavLink> }
        { loggedIn && <Link to="/" className="nav-link" onClick={logout}>Log out</Link>}
      </div>
    </nav>
  );
};


export default NavBar;