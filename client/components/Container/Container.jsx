import React from 'react';
import { connect } from 'react-redux';
import { createDraft } from 'APP/client/store';
import {
  ThumbsContainer,
  Thumbnail,
  CardEditor } from 'APP/client/components/index.jsx';
import './Container.css';
import ModalLauncher from'../HOC/ModalLauncher.jsx';
import { Map } from 'immutable';

import {
  CLASS_NAME_OBJ
} from '../HierarchyControl/CardTypes';

const EmptyProp = (type) => () => {
  return (<div>please add {CLASS_NAME_OBJ[type]}</div>);
};

const Container = (props) => {
  const { 
    type,
    handleNavigation,
    handleEdit,
    thumbs,
    children,
    parent 
    } = props;
    
  return (
    <div name={CLASS_NAME_OBJ[type]} className={CLASS_NAME_OBJ[type]}>
      <div className='container'>
        <ModalLauncher type={type} isEditing={true} styleClass={'addButton'}>
          <CardEditor
          type={type}
          newCard={true}
          parentPath={parent}/>
        </ModalLauncher>
        <ThumbsContainer {...props} empty={EmptyProp(type)} />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

const mapBuild = name => state => {
  return {
    name,
    navigator: state.navigator
  };
};

const mapProject = mapBuild('project');
const mapAct = mapBuild('act');
const mapSequence = mapBuild('sequence');
const mapScene = mapBuild('scene');
const mapBeat = mapBuild('beat');

const mapDispatch = (dispatch) => {
  return {
    handleEdit(project) {
      dispatch(createDraft(project));
    },
  };
};

const connectIt = (mapper) => {
  return connect(mapper, mapDispatch)(Container);
};

export const ProjectContainer = connectIt(mapProject);
export const ActContainer = connectIt(mapAct);
export const SequenceContainer = connectIt(mapSequence);
export const SceneContainer = connectIt(mapScene);
export const BeatContainer = connectIt(mapBeat);
