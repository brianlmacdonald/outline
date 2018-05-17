'use strict';
import React, { Component } from 'react'; 
import Loadable from 'react-loadable';
import '../HOC/addLoader.css';

const Loading = () => (<div className='loader' />);

const LoadableComponent = Loadable({
  loader: () => {
    return import('./CardEditor.jsx')},
  loading: Loading,
})

export default class LoadableCardEditor extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <LoadableComponent {...this.props} />;
  }
}
