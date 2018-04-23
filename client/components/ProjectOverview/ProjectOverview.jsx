'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Display,
  LoaderHOC,
  HierarchyControl
} from '../index.jsx';
import { toJS } from 'immutable';
import { 
  superState as testProject 
} from '../../store/reducers/tests/superState.js';

class ProjectOverview extends Component {
  constructor(props){
    super(props);
    this.state = {
      project: null,
      act: null,
      sequence: null,
      scene: null,
      beat: null
    };
  }

  render(){
    const { user } = this.props;
    const project = testProject;

    return(
      <HierarchyControl
        project={project}
      />
    );
  }
}

const mapState = state => ({
  project: state.project,
  user: state.user
});

const WrappedProjectOverview = LoaderHOC('user')(ProjectOverview);
const ConnectedProjectOverView = connect(mapState)(WrappedProjectOverview);
export default ConnectedProjectOverView;
