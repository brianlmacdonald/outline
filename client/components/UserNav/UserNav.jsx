'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/reducers/user';

const mapDispatch = dispatch => ({
  handleLogout(){
    dispatch(logout());
  }
});

const UserNav = connect(({user, project}) => ({user, project}),
  mapDispatch)(({ user, handleLogout }) => {
  const userName = user.get('firstName');

  return (
    <div>
      <nav>
      {!userName ?
        <div /> :
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
