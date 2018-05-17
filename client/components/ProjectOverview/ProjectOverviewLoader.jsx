'use strict';
import React, { Component } from 'react'; 
import Loadable from 'react-loadable';
import '../HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "ProjectOverview" */ './ProjectOverview.jsx')},
  loading: Loading,
})

export default class LoadableCardEditor extends Component {
  render() {
    return <LoadableComponent />;
  }
}