'use strict';
import { connect } from 'react-redux';
import { Container } from '../index.jsx';
import React, { Component } from 'react';
import {
  addNavigationPath,
  removeNavigationPath,
  loadSingleProject,
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
  USER_TYPE
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
            'acts'])
            .find((act) => act.get('id') === navigator.get(ACT_NAV))
            .get('sequences');

      case GET_SCENES:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_NAV),
            'acts'])
            .find((act) => act.get('id') === navigator.get(ACT_NAV))
            .get('sequences')
            .find((seq) => seq.get('id') === navigator.get(SEQUENCE_NAV))
            .get('scenes');

      case GET_BEATS:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_NAV),
            'acts'])
            .find((act) => act.get('id') === navigator.get(ACT_NAV))
            .get('sequences')
            .find((seq) => seq.get('id') === navigator.get(SEQUENCE_NAV))
            .get('scenes')
            .find((scene) => scene.get('id') === navigator.get(SCENE_NAV))
            .get('beats');

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
    const { handleNavigation, user, navigator } = this.props;
    
    return (
      <Container
        {...this.props}
        type={PROJECT_TYPE}
        thumbs={this.payloadSwitch(GET_PROJECTS)}
        parent={{id: user.get('id'), type: USER_TYPE}}
        handleNavigation={handleNavigation}
      >
        {this.ableToRender(PROJECT_NAV) && (
          <Container
            {...this.props}
            type={ACT_TYPE}
            thumbs={this.payloadSwitch(GET_ACTS)}
            parent={{ id: navigator.get(PROJECT_NAV), type: PROJECT_TYPE }}
            handleNavigation={handleNavigation}
          >
            {this.ableToRender(ACT_NAV) && (
              <Container
                {...this.props}
                type={SEQUENCE_TYPE}
                parent={{ id: navigator.get(ACT_NAV), type: ACT_TYPE }}
                thumbs={this.payloadSwitch(GET_SEQUENCES)}
                handleNavigation={handleNavigation}
              >
                {this.ableToRender(SEQUENCE_NAV) && (
                  <Container
                    {...this.props}
                    type={SCENE_TYPE}
                    parent={{
                      id: navigator.get(SEQUENCE_NAV),
                      type: SEQUENCE_TYPE
                      }}
                    thumbs={this.payloadSwitch(GET_SCENES)}
                    handleNavigation={handleNavigation}
                  >
                    {this.ableToRender(SCENE_NAV) && (
                      <Container
                        {...this.props}
                        type={BEAT_TYPE}
                        parent={{
                          id: navigator.get(SCENE_NAV),
                          type: SCENE_TYPE
                          }}
                        thumbs={this.payloadSwitch(GET_BEATS)}
                        handleNavigation={handleNavigation}
                      />
                    )}
                  </Container>
                )}
              </Container>
            )}
          </Container>
        )}
      </Container>
    );
  }
}

const mapDispatch = dispatch => ({
  handleNavigation(action, opts = {}) {
  
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
      dispatch(loadSingleProject(opts.userId, action.payload));
      break;
      
      default:
      throw new Error('bad type');
    }
  },
});

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft
});

import LoaderHOC from '../HOC/LoaderHOC.jsx';
const WrappedHC = LoaderHOC('project')(HierarchyControl);
const ConnectedHC = connect(mapState, mapDispatch)(WrappedHC);

export default ConnectedHC;
