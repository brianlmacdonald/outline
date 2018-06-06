'use strict';
import React, { Component } from 'react'; 
import Loadable from 'react-loadable';
import 'APP/client/components/HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "Signup" */'APP/client/components/Auth/Signup')},
  loading: Loading,
})

export default class LoadableLogin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <LoadableComponent {...this.props} />;
  }
}
