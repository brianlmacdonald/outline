'use strict';
import React, { Component } from 'react'; 
import Loadable from 'react-loadable';
import '../HOC/addLoader.css';

const Loading = () => {
  return (<div className='loader' />)
};

const LoadableComponent = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "ProjectOverview" */ './ProjectOverview.js')},
  loading: Loading,
})

export default class LoadableProjectOverview extends Component {
  render() {
    return <LoadableComponent />;
  }
}
