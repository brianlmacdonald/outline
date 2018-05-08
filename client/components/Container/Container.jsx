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
    thumbs,
    children,
    parent 
    } = props;
    
  return (
    <div name={CLASS_NAME_OBJ[type]} className={CLASS_NAME_OBJ[type]}>
      <div className='container'>
        <ModalLauncher type={type} message={'add '} isEditing={true} styleClass={'addButton'}>
          <CardEditor
          {...props}
          type={type}
          newCard={true}
          parent={parent}/>
        </ModalLauncher>
        <ThumbsContainer {...props} empty={EmptyProp(type)} />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Container;
