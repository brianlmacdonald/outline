'use strict';
import React, { Component } from 'react'; 
import Loadable from 'react-loadable';
import LoaderHOC from '../HOC/LoaderHOC.jsx';

const Loading = LoaderHOC('empty', <div />);

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
