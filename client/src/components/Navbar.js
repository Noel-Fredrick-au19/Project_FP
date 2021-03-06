import React from "react";
import { Link } from "react-router-dom";


const NavBar = ()=>{
    return(
      <nav>
      <div className="nav-wrapper #448aff blue accent-2">
        <Link to="/" className="brand-logo left">Home</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/profile">About</Link></li>
        </ul>
      </div>
    </nav>
    )
}

export default NavBar