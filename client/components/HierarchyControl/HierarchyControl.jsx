"use strict";
import { connect } from "react-redux";
import { addNavigationPath, removeNavigationPath } from "../../store";
import {
  ProjectContainer,
  ActContainer,
  SequenceContainer,
  SceneContainer,
  BeatContainer
} from "../index.jsx";
import React, { Component } from "react";

class HierarchyControl extends Component {
  constructor(props) {
    super(props);

    this.payloadSwitch = this.payloadSwitch.bind(this);
    this.ableToRender = this.ableToRender.bind(this);
  }

  payloadSwitch(cardRequest) {
    const { project, navigator } = this.props;
    console.log(project);
    switch (cardRequest) {
      case "projects":
        return project.get("userProjects").toArray();

      case "acts":
        return project
          .getIn(["userProjects", navigator.get("project"), "acts"])
          .toArray();

      case "sequences":
        return project
          .getIn([
            "userProjects",
            navigator.get("project"),
            "acts",
            navigator.get("act"),
            "sequences"
          ])
          .toArray();

      case "sences":
        return project
          .getIn([
            "userProjects",
            navigator.get("project"),
            "acts",
            navigator.get("act"),
            "sequences",
            navigator.get("sequence"),
            "scenes"
          ])
          .toArray();

      case "beats":
        return project
          .getIn([
            "userProjects",
            navigator.get("project"),
            "acts",
            navigator.get("act"),
            "sequences",
            navigator.get("sequence"),
            "scenes",
            navigator.get("scene"),
            "beats"
          ])
          .toArray();

      default:
        throw new Error("bad type", cardRequest);
    }
  }

  ableToRender(type, payload) {
    const {navigator} = this.props;

    try {
      if (!navigator.get(type)) return false;
      this.payloadSwitch(payload);
    } catch (err) {
      console.log('got here', err);
      if (err instanceof TypeError) return false;
    }
    console.log(type, payload, 'is able');
    return true;
  }
  //possibly a switch to decide what gets rendered instead of targetProp &&...
  render() {
    console.log(this.ableToRender('project', 'acts'));
    const { handleNavigation, navigator } = this.props;
    return (
      <ProjectContainer
        type="project"
        thumbs={this.payloadSwitch("projects")}
        parent={null}
        handleNavigation={handleNavigation}
      >
        {this.ableToRender("project", "acts") && (
          <ActContainer
            type="act"
            thumbs={this.payloadSwitch("acts")}
            parent={{ id: navigator.get("project"), type: "project" }}
            handleNavigation={handleNavigation}
          >
            {this.ableToRender("act", "sequences") && (
              <SequenceContainer
                type="sequence"
                parent={{ id: navigator.get("act"), type: "act" }}
                thumbs={this.payloadSwitch("sequences")}
                handleNavigation={handleNavigation}
              >
                {this.ableToRender("sequence", "scenes") && (
                  <SceneContainer
                    type="scene"
                    parent={{ id: navigator.get("sequence"), type: "sequence" }}
                    thumbs={this.payloadSwitch("scenes")}
                    handleNavigation={handleNavigation}
                  >
                    {this.ableToRender("scene", "beats") && (
                      <BeatContainer
                        type="beat"
                        parent={{ id: navigator.get("scene"), type: "scene" }}
                        thumbs={this.payloadSwitch("beats")}
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
      case 'beat':
      dispatch(addNavigationPath('beat', action.payload));
      break;
  
      case 'scene':
      dispatch(removeNavigationPath('beat'));
      dispatch(addNavigationPath('scene', action.payload));
      break;
  
      case 'sequence':
      dispatch(removeNavigationPath('beat'));
      dispatch(removeNavigationPath('scene'));
      dispatch(addNavigationPath('sequence', action.payload));
      break;
  
      case 'act':
      dispatch(removeNavigationPath('beat'));
      dispatch(removeNavigationPath('scene'));
      dispatch(removeNavigationPath('sequence'));
      dispatch(addNavigationPath('act', action.payload));
      break;
  
      case 'project':
      dispatch(removeNavigationPath('beat'));
      dispatch(removeNavigationPath('scene'));
      dispatch(removeNavigationPath('sequence'));
      dispatch(removeNavigationPath('act'));
      dispatch(addNavigationPath('project', action.payload));
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
