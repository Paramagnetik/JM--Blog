import React from 'react';
import './Headers.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setUserLogOutAction } from '../redux/actions/usersActions.js';
import avatar from '../Posts/img//avatar.png';

function Headers({ logOut, isSignUp, username, image }) {
  return (
    <div className="Header_header">
      <Link to="/" className="App_header_caption">
        Realworld Blog
      </Link>
      <div className="App_header_button-group">
        {isSignUp && (
          <>
            {' '}
            <Link className="App_header_profile_article" to="/new-article">
              Create article
            </Link>
            <Link to="/profile" className="App_header_button-profile">
              <div className="App_header_profile">
                <span>{username}</span>
                <img src={image || avatar} alt="avatar" className="App_header_profile_image" />
              </div>
            </Link>
            <button className="App_header_button_logOut" onClick={logOut}>
              Log Out
            </button>
          </>
        )}

        {!isSignUp && (
          <>
            <Link to="/sign-in" name="SignIn" className="App_header_button-In">
              Sign In
            </Link>{' '}
            <Link to="/sign-up" name="SignUp" className="App_header_button-Up">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users,
});

const mapDispatchToProps = {
  logOut: setUserLogOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
