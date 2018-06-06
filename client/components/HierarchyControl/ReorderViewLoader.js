'use strict';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import 'APP/client/components/HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "Reorder View" */'APP/client/components/HierarchyControl/ReorderView'),
  loading: Loading,
})

export default class LoadableReorderView extends Component {
  render() {
    return <LoadableComponent />;
  }
}
