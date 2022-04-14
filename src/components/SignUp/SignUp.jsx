import React, { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import style from './SignUp.module.scss';
import styles from '../PostsLists/PostsLists.module.scss';
import classes from '../SignIn/SignIn.module.scss';

import { signUpThunk } from '../../redux/actions/usersActions';

function SignUp({ signUp, serverErrors, isSignUp }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (value) => {
    signUp(value);
  };

  if (isSignUp) {
    return <Navigate replace to="/" />;
  }

  const emailClassErrors = errors.email ? classes['Modal_form_input-errors'] : classes.Modal_form_input;

  const passwordClassErrors = errors.password ? classes['Modal_form_input-errors'] : classes.Modal_form_input;

  const userClassErrors = errors.username ? classes['Modal_form_input-errors'] : classes.Modal_form_input;

  return (
    <div className={styles.App_main}>
      <form className={style.Modal_form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new account</h2>

        <label className={classes.Modal_form_label}>
          <span className={classes['Modal_form_label-text']}>Username</span>
          <input
            placeholder="Username"
            defaultValue="Username"
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

        <label className={classes.Modal_form_label}>
          <span className={classes['Modal_form_label-text']}>Email address:</span>
          <input
            placeholder="Email address"
            className={emailClassErrors}
            {...register('email', {
              required: 'Please enter your email',
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

        <label className={classes.Modal_form_label}>
          <span className={classes['Modal_form_label-text']}>Password:</span>
          <input
            placeholder="Password"
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

        <label className={classes.Modal_form_label}>
          <span className={classes['Modal_form_label-text']}>Repeat password:</span>
          <input
            placeholder="Password"
            className={passwordClassErrors}
            {...register('repeatPassword', {
              validate: (value) => value === password.current || 'The passwords do not match',
              required: 'Repeat password',
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
        {errors?.repeatPassword?.message && <p>{errors?.repeatPassword?.message || 'Error'}</p>}

        <label className={style['Modal_form__label-checkbox']}>
          <input
            className={style['Modal_form__input-checkbox']}
            type="checkbox"
            {...register('checkbox', { required: 'You must agree to the terms of the privacy policy.' })}
          />
          <div>
            <span className={style['Modal_form__input-checkbox-text']}>
              I agree to the processing of my personal information
            </span>
          </div>
        </label>
        {errors?.checkbox?.message && <p>{errors?.checkbox?.message || 'Error'}</p>}

        <button type="submit" className={classes.Modal_form_button}>
          Create
        </button>
        <span className={style.Form_footer}>
          Don’t have an account?<Link to="/sign-in">Sign In</Link>
        </span>
      </form>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users,
});

const mapDispatchToProps = {
  signUp: signUpThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

SignUp.defaultProps = {
  serverErrors: {},
};

SignUp.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  serverErrors: PropTypes.objectOf(),
  signUp: PropTypes.func.isRequired,
};
