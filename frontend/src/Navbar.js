import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Log In</Link>
        </li>
        <li>
          <Link to="/user-info">User Info</Link>
        </li>
        <li>
          <Link to="/food">Food</Link>
        </li>
        <li>
          <Link to="/workout">Workout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;