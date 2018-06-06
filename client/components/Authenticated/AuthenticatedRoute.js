'use strict';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const { user } = rest;
  const isLoggedIn = user && !!user.get('firstName');
  
  return <Route {...rest} render={(props) => (
    isLoggedIn ?
    <Component {...props}/>: 
    <Redirect to='/' />
  )}/>;
};

export default AuthenticatedRoute;
