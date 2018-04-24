import React from 'react';
import { connect } from 'react-redux';
import { createDraft } from 'APP/client/store';
import { Thumbnail, LoaderHOC, CardEditor } from 'APP/client/components/index.jsx';
import './Container.css';
import ModalLauncher from'../HOC/ModalLauncher.jsx';
import { Map } from 'immutable';
const addProjectElement = (thing1, thing2) => console.log(thing1, thing2);
const tempCard = Map({id: 1, title: '', body: ''});

const Container = (props) => {
  const { type, handleAdd, handleEdit, thumbs, children, parentPath } = props;
  
  return (
    <div name={type} className={type}>
      <div className='container'>
        <ModalLauncher type={type} styleClass={'addButton'}>
          <CardEditor
          card={tempCard}/>
        </ModalLauncher>
        {thumbs.map( el => {
            return (<Thumbnail
            id={el.get('id')}
            type={type}
            card={el}
            handleClick={console.log.bind(this)}
            handleEdit={() => handleEdit(el)}
          />);
        })}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

const mapBuild = name => state => {
  return {
    name
  };
};

const mapProject = mapBuild('project');
const mapAct = mapBuild('act');
const mapSequence = mapBuild('sequence');
const mapScene = mapBuild('scene');
const mapBeat = mapBuild('beat');

const mapDispatch = (dispatch) => {
  return {
    handleAdd(evt) {
      evt.preventDefault();
      const elementName = evt.target.name;
      const pathToNewElement = evt.target.pathToNewElement;
      dispatch(addProjectElement(elementName, pathToNewElement));
    },
    handleEdit(project) {
      dispatch(createDraft(project));
    },
  };
};

const WrappedContainer = LoaderHOC('thumbs')(Container);

const connectIt = (mapper) => {
  return connect(mapper, mapDispatch)(WrappedContainer);
};

export const ProjectContainer = connectIt(mapProject);
export const ActContainer = connectIt(mapAct);
export const SequenceContainer = connectIt(mapSequence);
export const SceneContainer = connectIt(mapScene);
export const BeatContainer = connectIt(mapBeat);
