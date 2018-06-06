'use strict';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import 'APP/client/components/HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "Navigation View" */'APP/client/components/HierarchyControl/NavigationView'),
  loading: Loading,
})

export default class LoadableNavView extends Component {
  render() {
    return <LoadableComponent />;
  }
}
