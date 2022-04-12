import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import classes from '../PostsLists/PostsLists.module.scss'
import style from '../SignIn/SignIn.module.scss';

import { updateUserThunk } from '../redux/actions/usersActions';

function Profile({ isSignUp, username, email, image, updateUser, token, serverErrors }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (value) => {
    updateUser(value, token)
      .then((data) => {
        data.user && message.info('Сhange successful!');
      })
      .catch((data) => data.errors && message.error('Validation error'));
  };

  const userClassErrors = errors.username ? style['Modal_form_input-errors'] : style.Modal_form_input;

  const emailClassErrors = errors.email ? style['Modal_form_input-errors'] : style.Modal_form_input;

  const passwordClassErrors = errors.password ? style['Modal_form_input-errors'] : style.Modal_form_input;

  if (!isSignUp) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={classes.App_main}>
      <form className={style.Modal_form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Profile</h2>
        <label className={style.Modal_form_label}>
          <span className={style["Modal_form_label-text"]}>Username</span>
          <input
            placeholder="Username"
            defaultValue={username}
            className={userClassErrors}
            {...register('username', {
              required: 'Please enter your username',
              minLength: {
                value: 3,
                message: 'at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'maximum 20 characters',
              },
            })}
          />
        </label>
        {errors?.username?.message && <p>{errors?.username?.message || 'Error'}</p>}
        {serverErrors?.username && <p>{serverErrors.username}</p>}

        <label className={style.Modal_form_label}>
          <span className={style["Modal_form_label-text"]}>Email address</span>
          <input
            placeholder="Email address"
            defaultValue={email}
            className={emailClassErrors}
            {...register('email', {
              required: 'Please enter your email',
              minLength: {
                value: 4,
                message: 'Please enter a valid email',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email',
              },
            })}
            type="email"
          />
        </label>
        {errors?.email?.message && <p>{errors?.email?.message || 'Error'}</p>}
        {serverErrors?.email && <p>{serverErrors.email}</p>}

        <label className={style.Modal_form_label}>
          <span className={style["Modal_form_label-text"]}>New Password</span>
          <input
            placeholder="New password"
            className={passwordClassErrors}
            {...register('password', {
              required: 'Please enter your password',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'password cannot be longer than 40 characters',
              },
            })}
            type="password"
          />
        </label>
        {errors?.password?.message && <p>{errors?.password?.message || 'Error'}</p>}

        <label className={style.Modal_form_label}>
          <span className={style["Modal_form_label-text"]}>Avatar image (url)</span>
          <input
            placeholder="Avatar image"
            defaultValue={image}
            className={style.Modal_form_input}
            {...register('image', {
              pattern: {
                value: /^(https:|http:|www\.)\S*(.png|.jpeg|.jpg|.gif)/,
                message: 'URL is invalid',
              },
            })}
            type="url"
          />
        </label>
        {errors?.image?.message && <p>{errors?.image?.message || 'Error'}</p>}

        <button type="submit" className={style.Modal_form_button}>
          Save
        </button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  updateUser: updateUserThunk,
};

const mapStateToProps = ({ users }) => ({
  ...users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

Profile.defaultProps = {
  serverErrors: {},
  token: '',
  username: '',
  image: '',
  email: '',
};

Profile.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  serverErrors: PropTypes.objectOf(PropTypes.string),
  token: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
};