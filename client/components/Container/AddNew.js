'use strict';
import React from 'react';
import ModalLauncher from 'APP/client/components/HOC/ModalLauncherLoader';
import { CLASS_NAME_OBJ } from 'APP/client/components/HierarchyControl/CardTypes';
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
