'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/reducers/user';
import PropTypes from 'prop-types';
import './Auth.css';

export const UserAuth = props => {
  const { name, handleSubmit, displayName, error } = props;

  return (
    <div className='auth'>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div>
            <div>
              <label>first name</label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label>last name</label>
              <input name="lastName" type="text" />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email">email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <a hidden={true} href="/auth/google">{displayName} with Google</a>
      </form>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value.toLowerCase();
      const password = evt.target.password.value;
      const firstName =
        formName === 'signup' ?
        evt.target.firstName.value :
        null;
      const lastName = 
        formName === 'signup' ?
        evt.target.lastName.value :
        null;
        
      dispatch(auth(email, password, formName, firstName, lastName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(UserAuth);
export const Signup = connect(mapSignup, mapDispatch)(UserAuth);

/**
 * PROP TYPES
 */
UserAuth.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
