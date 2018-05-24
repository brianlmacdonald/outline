'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/reducers/user';
import PropTypes from 'prop-types';
import './Auth.css';

export const UserAuth = props => {
  const { name, handleSubmit, displayName, error } = props;

  return (
    <div className='auth centeredDiv'>
      <form onSubmit={handleSubmit} name={name}>
        <h1 className='headerBox'>{displayName.toUpperCase()}</h1>
        {name === 'signup' && (
          <div>
            <div>
              <input
              className='authInputs'
              placeholder='first name'
              name="firstName"
              type="text" />
            </div>
            <div>
              <input
                className='authInputs'
                placeholder='last name'
                name="lastName"
                type="text" />
            </div>
          </div>
        )}
        <div>
          <input
          className='authInputs'
          placeholder='email'
          name="email"
          type="email" />
        </div>
        <div >
          <input
          className='authInputs'
          placeholder='password'
          name="password"
          type="password" />
        </div>
        <div className='authButtonGroup'>
          <button className='soloButton' type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <a hidden={true} href="/auth/google">{displayName} with Google</a>
        {name === 'signup' && (
          <div>
            <p className='spam'>*no spam.</p>
          </div>
        )}
      </form>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'sign up',
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
