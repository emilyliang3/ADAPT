import React from "react";
import { Link } from "react-router-dom";
 

function Navbar({signedIn}) {
  if (signedIn){
    return (
      <nav className="navbar">
        <div className = "shift-left">
          <ul>
            <li id = "logo">
              <img src = "/logo.png" id = "logopic" alt = "logo"/>          
            </li>
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
        </div>
      </nav>
    );
  }
  else {
    return (
      <nav className="navbar">
        <div className = "shift-left">
          <ul>
            <li id = "logo">
              <img src = "/logo.png" id = "logopic" alt = "logo"/>
            </li>
            <li>
              <Link to="/">Log In</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;