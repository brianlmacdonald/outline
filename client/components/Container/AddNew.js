'use strict';
import React from 'react';
import ModalLauncher from '../HOC/ModalLauncher';
import CardEditor from '../CardEditor/CardEditorLoader';
import { CLASS_NAME_OBJ } from '../HierarchyControl/CardTypes';
import { Link } from 'react-router-dom';

const AddNew = (props) => {
  const { 
    type,
    parent,
    thumbs,
    nextIdx
    } = props;
  return (
    <Link to={{
      pathname: '/projects/edit',
      state: {
        card: null,
        isNewCard: true,
        parent,
        type,
        nextIdx
      }
    }}
    ><button className='addButton'>{`add ${CLASS_NAME_OBJ[type]}`}</button></Link>
  );
};

export default AddNew;
