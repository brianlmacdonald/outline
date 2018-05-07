'use strict';
import { connect } from 'react-redux';
import { Container } from '../index.jsx';
import React, { Component } from 'react';
import {
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  USER_TYPE,
  projectNavigation,
  actNavigation,
  sequenceNavigation,
  sceneNavigation,
  beatNavigation
} from '../../store';
import {
  GET_PROJECTS,
  GET_ACTS,
  GET_SEQUENCES,
  GET_SCENES,
  GET_BEATS
} from './CardTypes';
import LoaderHOC from '../HOC/LoaderHOC.jsx';


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
          .getIn(['userProjects', navigator.get(PROJECT_TYPE), 'acts']);

      case GET_SEQUENCES:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_TYPE),
            'acts'])
            .find((act) => act.get('id') === navigator.get(ACT_TYPE))
            .get('sequences');

      case GET_SCENES:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_TYPE),
            'acts'])
            .find((act) => act.get('id') === navigator.get(ACT_TYPE))
            .get('sequences')
            .find((seq) => seq.get('id') === navigator.get(SEQUENCE_TYPE))
            .get('scenes');

      case GET_BEATS:
        return project
          .getIn([
            'userProjects',
            navigator.get(PROJECT_TYPE),
            'acts'])
            .find((act) => act.get('id') === navigator.get(ACT_TYPE))
            .get('sequences')
            .find((seq) => seq.get('id') === navigator.get(SEQUENCE_TYPE))
            .get('scenes')
            .find((scene) => scene.get('id') === navigator.get(SCENE_TYPE))
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
        handleNavigation={handleNavigation(projectNavigation)}
      >
        {this.ableToRender(PROJECT_TYPE) && (
          <Container
            {...this.props}
            type={ACT_TYPE}
            thumbs={this.payloadSwitch(GET_ACTS)}
            parent={{ id: navigator.get(PROJECT_TYPE), type: PROJECT_TYPE }}
            handleNavigation={handleNavigation(actNavigation)}
          >
            {this.ableToRender(ACT_TYPE) && (
              <Container
                {...this.props}
                type={SEQUENCE_TYPE}
                parent={{ id: navigator.get(ACT_TYPE), type: ACT_TYPE }}
                thumbs={this.payloadSwitch(GET_SEQUENCES)}
                handleNavigation={handleNavigation(sequenceNavigation)}
              >
                {this.ableToRender(SEQUENCE_TYPE) && (
                  <Container
                    {...this.props}
                    type={SCENE_TYPE}
                    parent={{
                      id: navigator.get(SEQUENCE_TYPE),
                      type: SEQUENCE_TYPE
                      }}
                    thumbs={this.payloadSwitch(GET_SCENES)}
                    handleNavigation={handleNavigation(sceneNavigation)}
                  >
                    {this.ableToRender(SCENE_TYPE) && (
                      <Container
                        {...this.props}
                        type={BEAT_TYPE}
                        parent={{
                          id: navigator.get(SCENE_TYPE),
                          type: SCENE_TYPE
                          }}
                        thumbs={this.payloadSwitch(GET_BEATS)}
                        handleNavigation={handleNavigation(beatNavigation)}
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
  handleNavigation(navigationThunk) {
    return function(payload){
      dispatch(navigationThunk(payload));
    };
  },
});

const mapState = state => ({
  user: state.user,
  project: state.project,
  navigator: state.navigator,
  draft: state.draft
});

const WrappedHC = LoaderHOC('project')(HierarchyControl);
const ConnectedHC = connect(mapState, mapDispatch)(WrappedHC);

export default ConnectedHC;
