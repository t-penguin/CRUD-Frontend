import React from "react";
import "./NavBarStyles.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </nav>
  );
};

export default NavBar;
