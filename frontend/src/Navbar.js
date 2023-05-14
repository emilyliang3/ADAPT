import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">User Info</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
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