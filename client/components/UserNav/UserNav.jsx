'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/reducers/user';

const mapDispatch = dispatch => ({
  handleLogout(){
    dispatch(logout());
  }
});

const UserNav = connect(({user}) => ({user}),
  mapDispatch)(({ user, handleLogout }) => {
  const userName = user.get('firstName');

  return (
    <div>
      <nav>
      {!userName ?
        <div>
          <Link to={'/login'}>
            <button>login</button>
          </Link>
          <Link to={'/signup'}>
            <button>signup</button>
          </Link>
        </div> :
        <div>
        <p>Hello, {userName}!</p>
        <button
        onClick={handleLogout}
        >log out</button>
        </div>
      }
      </nav>
    </div>
  );
});

export default UserNav;
