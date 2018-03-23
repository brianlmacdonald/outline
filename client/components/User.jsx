'use strict';
import React, {component} from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';
import PropTypes from 'prop-types';

const UserAuth = (props) => {
  const {name, handleSubmite, displayName, error} = props;

  return(
    <div>
      <form>
        <div>
          <label htmlFor='email'>email</label>
          <input name='email' type='text' />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <FlatButton type="submit" primary={true} label={displayName} />
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <a href="/auth/google">{displayName} with Google</a>
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login'
    ,displayName: 'Login'
    ,error: state.user.error
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup'
    ,displayName: 'Sign Up'
    ,error: state.user.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(UserAuth);
export const Signup = connect(mapSignup, mapDispatch)(UserAuth);

/**
 * PROP TYPES
 */
UserAuth.propTypes = {
  name: PropTypes.string.isRequired
  ,displayName: PropTypes.string.isRequired
  ,handleSubmit: PropTypes.func.isRequired
  ,error: PropTypes.object
};
