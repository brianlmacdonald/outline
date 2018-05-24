'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/reducers/user';
import './UserNav.css';

const mapDispatch = dispatch => ({
  handleLogout(){
    dispatch(logout());
  }
});

const UserNav = connect(({user, project}) => ({user, project}),
  mapDispatch)(({ user, handleLogout }) => {
  const userName = user.get('firstName');

  return (
      <nav className='nav'>
      {!userName ?
        <div /> :
        <div className='userBox'>
          <p className='userName'>{userName}</p>
          <button
          className='logout'
          onClick={handleLogout}
          >log out</button>
        </div>
      }
      </nav>
  );
});

export default UserNav;
