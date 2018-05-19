import React from 'react';
import { connect } from 'react-redux';
import ThumbsContainer from './ThumbsContainer.jsx';
import CardEditor from '../CardEditor/CardEditorLoader.jsx';
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
    draft,
    type,
    thumbs,
    children,
    parent 
    } = props;
    
  return (
    <div name={CLASS_NAME_OBJ[type]} className={CLASS_NAME_OBJ[type]}>
      <div className='container'>
        <ModalLauncher type={type} message={'add '} draft={draft} styleClass={'addButton'}>
          <CardEditor
          {...props}
          type={type}
          newCard={true}
          parent={parent}/>
        </ModalLauncher>
        <ThumbsContainer {...props} empty={EmptyProp(type)} />
      </div>
      <div className='thumbsContainer'>
        {children}
      </div>
    </div>
  );
};

export default Container;
