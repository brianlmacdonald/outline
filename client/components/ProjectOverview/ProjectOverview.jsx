'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Display,
  LoaderHOC,
  HierarchyControl
} from '../index.jsx';
import { toJS } from 'immutable';

//this will eventually be a visualization component for the entire story.
//hierachy view is more of an organization for editing. 
//project/overview vs project/edit

class ProjectOverview extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { user } = this.props;

    return(
      <HierarchyControl />
    );
  }
}

const mapState = state => ({
  user: state.user
});

const WrappedProjectOverview = LoaderHOC('user')(ProjectOverview);
const ConnectedProjectOverView = connect(mapState)(WrappedProjectOverview);
export default ConnectedProjectOverView;
