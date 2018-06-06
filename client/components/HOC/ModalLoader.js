'use strict';
import React, { Component } from 'react'; 
import Loadable from 'react-loadable';
import 'APP/client/components/HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => {
    return import(/* webpackChunkName: "Modal" */'APP/client/components/HOC/Modal')},
  loading: Loading,
})

export default class LoadableModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <LoadableComponent {...this.props} />;
  }
}
