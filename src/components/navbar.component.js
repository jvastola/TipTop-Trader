import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {

  render() { 
    return (
        <nav className="bg-gray-200">
        <span className="splash-nav-logo">TipTop Trader</span>
        <span className="nav-splash-span">
          <Link className="splash-nav-link login-splash-link" to="/login">Log in</Link>
          <Link className="splash-nav-link signup-splash-link" to="/signup">Sign up</Link>
        </span>
      </nav>
    );
  }
}