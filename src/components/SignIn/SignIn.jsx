import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './SignIn.module.scss';
import classes from '../PostsLists/PostsLists.module.scss';
import style from '../SignUp/SignUp.module.scss';

import { signInThunk } from '../redux/actions/usersActions';

function SignIn({ signIn, isSignUp }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (value) => {
    signIn(value);
    reset();
  };

  if (isSignUp) {
    return <Navigate replace to="/" />;
  }

  const emailClassErrors = errors.email ? styles['Modal_form_input-errors'] : styles.Modal_form_input;

  const passwordClassErrors = errors.password ? styles['Modal_form_input-errors'] : styles.Modal_form_input;

  return (
    <div className={classes.App_main}>
      <form className={style.Modal_form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        <label className={styles.Modal_form_label}>
          <span className={styles['Modal_form_label-text']}>Email address:</span>
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

        <label className={styles.Modal_form_label}>
          <span className={styles['Modal_form_label-text']}>Password:</span>
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
        <button type="submit" className={styles.Modal_form_button}>
          Login
        </button>
        <span className={style.Form_footer}>
          Don’t have an account?<Link to="/sign-up">Sign Up</Link>
        </span>
      </form>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users,
});

const mapDispatchToProps = {
  signIn: signInThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
};