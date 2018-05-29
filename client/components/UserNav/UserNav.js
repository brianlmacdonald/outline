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
//move logic for reorder and navigator view toggle into here.
//decide what the nav bar will have. Home. search. User dropdown.
const UserNav = connect(({user, project}) => ({user, project}),
  mapDispatch)(({ user, handleLogout }) => {
  const userName = user.get('firstName');

  return (
      <nav className='nav'>
      </nav>
  );
});

export default UserNav;
