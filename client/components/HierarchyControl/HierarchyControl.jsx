'use strict';
import { connect } from 'react-redux';
import { addNavigationPath, removeNavigationPath } from '../../store';
import {
  ProjectContainer,
  ActContainer,
  SequenceContainer,
  SceneContainer,
  BeatContainer
} from '../index.jsx';
import React, { Component } from 'react';
import {
  PROJECT_NAV,
  ACT_NAV,
  SEQUENCE_NAV,
  SCENE_NAV,
  BEAT_NAV,
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
} from '../../store';
import {
  GET_PROJECTS,
  GET_ACTS,
  GET_SEQUENCES,
  GET_SCENES,
  GET_BEATS
} from './CardTypes';



class HierarchyControl extends Component {
  constructor(props) {
    super(props);

    this.payloadSwitch = this.payloadSwitch.bind(this);
    this.ableToRender = this.ableToRender.bind(this);
  }

  payloadSwitch(cardRequest) {
    const { project, navigator } = this.props;

    switch (cardRequest) {
      case GET_PROJECTS:
        return project.get('userProjects');

      case GET_ACTS:
        return project
          .getIn(['userProjects', navigator.get(PROJECT_NAV), 'acts']);

      case GET_SEQUENCES:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_NAV),
            'acts',
            navigator.get(ACT_NAV),
            'sequences'
          ]);

      case GET_SCENES:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_NAV),
            'acts',
            navigator.get(ACT_NAV),
            'sequences',
            navigator.get(SEQUENCE_NAV),
            'scenes'
          ]);

      case GET_BEATS:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_NAV),
            'acts',
            navigator.get(ACT_NAV),
            'sequences',
            navigator.get(SEQUENCE_NAV),
            'scenes',
            navigator.get(SCENE_NAV),
            'beats'
          ]);

      default:
        throw new Error('Unknown type');
    }
  }
  //ableToRender is extraneous at the moment, but will keep in place
  //in case of other render checks later.  Will be deleted otherwise.
  ableToRender(type) {
    const { navigator } = this.props;

    if (navigator.get(type) === null) return false;

    return true;
  }

  render() {
    const { handleNavigation, navigator } = this.props;
    return (
      <ProjectContainer
        type={PROJECT_TYPE}
        thumbs={this.payloadSwitch(GET_PROJECTS)}
        parent={null}
        handleNavigation={handleNavigation}
      >
        {this.ableToRender(PROJECT_NAV) && (
          <ActContainer
            type={ACT_TYPE}
            thumbs={this.payloadSwitch(GET_ACTS)}
            parent={{ id: navigator.get(PROJECT_NAV), type: PROJECT_TYPE }}
            handleNavigation={handleNavigation}
          >
            {this.ableToRender(ACT_NAV) && (
              <SequenceContainer
                type={SEQUENCE_TYPE}
                parent={{ id: navigator.get(ACT_NAV), type: ACT_TYPE }}
                thumbs={this.payloadSwitch(GET_SEQUENCES)}
                handleNavigation={handleNavigation}
              >
                {this.ableToRender(SEQUENCE_NAV) && (
                  <SceneContainer
                    type={SCENE_TYPE}
                    parent={{ id: navigator.get(SEQUENCE_NAV), type: SEQUENCE_TYPE }}
                    thumbs={this.payloadSwitch(GET_SCENES)}
                    handleNavigation={handleNavigation}
                  >
                    {this.ableToRender(SCENE_NAV) && (
                      <BeatContainer
                        type={BEAT_TYPE}
                        parent={{ id: navigator.get(SCENE_NAV), type: SCENE_TYPE }}
                        thumbs={this.payloadSwitch(GET_BEATS)}
                        handleNavigation={handleNavigation}
                      />
                    )}
                  </SceneContainer>
                )}
              </SequenceContainer>
            )}
          </ActContainer>
        )}
      </ProjectContainer>
    );
  }
}

const mapDispatch = dispatch => ({
  handleNavigation(action) {

    switch(action.type) {
      case BEAT_NAV:
      dispatch(addNavigationPath(BEAT_NAV, action.payload));
      break;
  
      case SCENE_NAV:
      dispatch(removeNavigationPath(BEAT_NAV));
      dispatch(addNavigationPath(SCENE_NAV, action.payload));
      break;
  
      case SEQUENCE_NAV:
      dispatch(removeNavigationPath(BEAT_NAV));
      dispatch(removeNavigationPath(SCENE_NAV));
      dispatch(addNavigationPath(SEQUENCE_NAV, action.payload));
      break;
  
      case ACT_NAV:
      dispatch(removeNavigationPath(BEAT_NAV));
      dispatch(removeNavigationPath(SCENE_NAV));
      dispatch(removeNavigationPath(SEQUENCE_NAV));
      dispatch(addNavigationPath(ACT_NAV, action.payload));
      break;
  
      case PROJECT_NAV:
      dispatch(removeNavigationPath(BEAT_NAV));
      dispatch(removeNavigationPath(SCENE_NAV));
      dispatch(removeNavigationPath(SEQUENCE_NAV));
      dispatch(removeNavigationPath(ACT_NAV));
      dispatch(addNavigationPath(PROJECT_NAV, action.payload));
      break;
      
      default:
      throw new Error('bad type');
    }
  },
});

const mapState = state => ({
  project: state.project,
  navigator: state.navigator
});

import LoaderHOC from '../HOC/LoaderHOC.jsx';
const WrappedHC = LoaderHOC('project')(HierarchyControl);
const ConnectedHC = connect(mapState, mapDispatch)(WrappedHC);

export default ConnectedHC;
