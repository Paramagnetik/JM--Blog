import React from 'react';
import './Headers.css';
import { Link } from 'react-router-dom';

function Headers() {
  return (
    <div className="Header_header">
      <button className="App_header_caption">
        {' '}
        <Link to="/">Realworld Blog</Link>
      </button>
      <div className="App_header_button-group">
        <div className="App_header_button-In">Sign In</div>
        <div className="App_header_button-Up">Sign Up</div>
      </div>
    </div>
  );
}

export default Headers;
