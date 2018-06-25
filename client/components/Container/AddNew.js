'use strict';
import React from 'react';
import ModalLauncher from 'APP/client/components/HOC/ModalLauncherLoader';
import { CLASS_NAME_OBJ } from 'APP/client/components/HierarchyControl/CardTypes';
import { Link } from 'react-router-dom';
import 'APP/client/components/Container/AddNew.css';

const AddNew = (props) => {
  const { 
    type,
    parent,
    thumbs,
    nextIdx
    } = props;
  return (
    <div id={`add-${type}`} className='add-container'>
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
    ><button className='add-button'>{`add ${CLASS_NAME_OBJ[type]}`}</button></Link></div>
  );
};

export default AddNew;
