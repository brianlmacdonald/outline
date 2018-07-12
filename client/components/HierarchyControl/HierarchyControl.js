'use strict';
import React, { Component } from 'react';
import { List } from 'immutable';
import {
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE,
  USER_TYPE } from 'APP/client/store/reducers/project';
import {
  projectNavigation,
  actNavigation,
  sequenceNavigation,
  sceneNavigation,
  beatNavigation
} from 'APP/client/store/reducers/navigator';
import {
  GET_PROJECTS,
  GET_ACTS,
  GET_SEQUENCES,
  GET_SCENES,
  GET_BEATS
} from 'APP/client/components/HierarchyControl/CardTypes';
import 'APP/client/components/HierarchyControl/HierarchyControl.css';

function InjectContainer(Container) {
  return class HierarchyControl extends Component {
    constructor(props) {
      super(props);
      this.payloadSwitch = this.payloadSwitch.bind(this);
      this.ableToRender = this.ableToRender.bind(this);
    }

    payloadSwitch(cardRequest) {
      const { project, navigator } = this.props;

      switch (cardRequest) {
        case GET_PROJECTS:
          return project.get('userProjects').sortBy(a => a.get('updated_at')).reverse();

        case GET_ACTS:
          return project
            .get('userProjects')
            .find((proj) => proj.get('id') === navigator.get(PROJECT_TYPE))
            .get('acts').sortBy(a => a.get('index')) || List([]);

        case GET_SEQUENCES:
          return project
            .get('userProjects')
            .find((proj) => proj.get('id') === navigator.get(PROJECT_TYPE))
            .get('acts')
            .find((act) => act.get('id') === navigator.get(ACT_TYPE))
            .get('sequences').sortBy(a => a.get('index')) || List([]);

        case GET_SCENES:
          return project
            .get('userProjects')
            .find((proj) => proj.get('id') === navigator.get(PROJECT_TYPE))
            .get('acts')
            .find((act) => act.get('id') === navigator.get(ACT_TYPE))
            .get('sequences')
            .find((seq) => seq.get('id') === navigator.get(SEQUENCE_TYPE))
            .get('scenes').sortBy(a => a.get('index')) || List([]);

        case GET_BEATS:
          return project
            .get('userProjects')
            .find((proj) => proj.get('id') === navigator.get(PROJECT_TYPE))
            .get('acts')
            .find((act) => act.get('id') === navigator.get(ACT_TYPE))
            .get('sequences')
            .find((seq) => seq.get('id') === navigator.get(SEQUENCE_TYPE))
            .get('scenes')
            .find((scene) => scene.get('id') === navigator.get(SCENE_TYPE))
            .get('beats').sortBy(a => a.get('index')) || List([]);

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
        <div className='h-c-container'>
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
        </div>
      );
    }
};
}

export default InjectContainer;
