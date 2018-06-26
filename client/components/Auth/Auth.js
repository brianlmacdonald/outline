'use strict';
import React from 'react';
import { connect } from 'react-redux';
import userReducer, { auth } from 'APP/client/store/reducers/user';
import PropTypes from 'prop-types';
import 'APP/client/components/Auth/Auth.css';
import reducerRegistry from 'APP/client/store/reducers/ReducerRegistry';

const reducerName = 'user';
reducerRegistry.register(reducerName, userReducer);

export const UserAuth = props => {
  const { name, handleSubmit, displayName, error } = props;
  
  return (
    <div className='auth centeredDiv content'>
      <form onSubmit={handleSubmit} name={name}>
        <h1>{displayName.toUpperCase()}</h1>
        {name === 'signup' && (
          <div>
          <div className='field'>
            <label className='label'>first name</label>
            <div className='control'>
              <input
              className='input'
              placeholder='Joe'
              name="firstName"
              type="text" />
            </div>
          </div>
            <div className='field'>
              <label className='label'>last name</label>
              <div className='control'>
              <input
                className='input'
                placeholder='Smith'
                name="lastName"
                type="text" />
              </div>
            </div>
          </div>
        )}
        <div className='field'>
          <label className='label'>email</label>
          <div className='control'>
          <input
          className='input'
          placeholder='joesmith@outline.com'
          name="email"
          type="email" />
          </div>
        </div>
        <div className='field'>
        <label className='label'>password</label>
        <div className='control'>
          <input
          className='input'
          placeholder='**********'
          name="password"
          type="password" />
        </div>
        </div>
        <div className='authButtonGroup'>
          <button className='button is-white is-outlined' type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
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
