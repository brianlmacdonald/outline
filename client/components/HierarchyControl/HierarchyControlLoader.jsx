'use strict';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import '../HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "HierarchyControl" */'./HierarchyControl.jsx'),
  loading: Loading,
})

export default class LoadableHC extends Component {
  render() {
    return <LoadableComponent />;
  }
}
