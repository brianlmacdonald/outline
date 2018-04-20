import React from 'react';
import { connect } from 'react-redux';
// import { addProjectElement } from 'APP/client/store';
import { Thumbnail, LoaderHOC } from 'APP/client/components/index.jsx';
import './Container.css';

const addProjectElement = (thing1, thing2) => console.log(thing1, thing2);

const Container = (props) => {
  const { type, handleAdd, framesToRender, children } = props;
  
  return (
    <div name={type} className={type}>
      <div className='container'>
        <button onClick={handleAdd}>add {type}</button>
        {framesToRender.map( el => {
          return (<Thumbnail
            id={el.title}
            title={el.title}
            body={el.body}
            handleClick={console.log.bind(this)}
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
    handleAdd (evt) {
      evt.preventDefault();
      const elementName = evt.target.name;
      const pathToNewElement = evt.target.pathToNewElement;
      dispatch(addProjectElement(elementName, pathToNewElement));
    }
  };
};

const WrappedContainer = LoaderHOC('framesToRender')(Container);

const connectIt = (mapper) => {
  return connect(mapper, mapDispatch)(WrappedContainer);
};

export const ProjectContainer = connectIt(mapProject);
export const ActContainer = connectIt(mapAct);
export const SequenceContainer = connectIt(mapSequence);
export const SceneContainer = connectIt(mapScene);
export const BeatContainer = connectIt(mapBeat);
