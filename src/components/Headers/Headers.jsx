import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import style from'./Headers.module.scss';

import { setUserLogOutAction } from '../redux/actions/usersActions';
import avatar from "../Posts/img/avatar.png";

function Headers({ logOut, isSignUp, username, image }) {
  return (
    <div className={style.Header_header}>
      <NavLink to="/" className={style.App_header_caption}>
        Realworld Blog
      </NavLink>
      <div className={style['App_header_button-group']}>
        {isSignUp && (
          <>
            {' '}
            <NavLink className={style.App_header_profile_article} to="/new-article">
              Create article
            </NavLink>
            <Link to="/profile">
              <div className={style.App_header_profile}>
                <span>{username}</span>
                <img src={image || avatar} alt="avatar" className={style.App_header_profile_image} />
              </div>
            </Link>
            <button type="button" className={style.App_header_button_logOut} onClick={logOut}>
              Log Out
            </button>
          </>
        )}

        {!isSignUp && (
          <>
            <NavLink
              to="/sign-in"
              name="SignIn"
              className={({ isActive }) =>
                isActive ? style['App_header_button-In-active'] : style['App_header_button-In']
              }
            >
              Sign In
            </NavLink>{' '}
            <NavLink
              to="/sign-up"
              name="SignUp"
              className={({ isActive }) =>
                isActive ? style['App_header_button-Up-active'] : style['App_header_button-Up']
              }
            >
              Sign Up
            </NavLink>
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

Headers.defaultProps = {
  username: '',
  image: '',
};

Headers.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  username: PropTypes.string,
  image: PropTypes.string,
  logOut: PropTypes.func.isRequired,
};