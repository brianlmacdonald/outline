'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserNav = connect( ({user}) => ({user}))(({ user }) => {
  const userName = user.get('firstName');
  console.log(user);
  (user && console.log(user.get('firstName')));
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
        <button>log out</button>
        </div>
      }
      </nav>
    </div>
  );
});

export default UserNav;
