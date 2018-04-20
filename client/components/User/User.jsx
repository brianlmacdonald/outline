'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Display,
  LoaderHOC,
  ProjectContainer,
  ActContainer,
  SequenceContainer,
  SceneContainer,
  BeatContainer
} from '../index.jsx';
import { toJS } from 'immutable';

const testProject = [
  {title: 'a', id: 1, body: 'a tale of two cities', acts: {act1: {title: 'the beginning'}}},
  {title: 'b', id: 2, body: 'a tale of deception', acts: {act1: {title: 'flashback'}}},
  {title: 'c', id: 3, body: 'a tale of tails', acts: {act1: {title: 'flashback again'}}}
];

class User extends Component {
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
      <ProjectContainer
        type="project"
        pathToElement="userProjects"
        framesToRender={project}
      >
        <ActContainer >
          <SequenceContainer>
            <SceneContainer>
              <BeatContainer />
            </SceneContainer>
          </SequenceContainer>
        </ActContainer>
      </ProjectContainer>
    );
  }
}

const mapState = state => ({
  project: state.project,
  user: state.user
});

const WrappedUser = LoaderHOC('user')(User);
const ConnectedUser = connect(mapState)(WrappedUser);
export default ConnectedUser;
