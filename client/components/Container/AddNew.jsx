'use strict';
import React from 'react';
import ModalLauncher from '../HOC/ModalLauncher.jsx';
import CardEditor from '../CardEditor/CardEditorLoader.jsx';

const AddNew = (props) => {
  const { 
    draft,
    type,
    parent 
    } = props;
  return (
          <ModalLauncher type={type} message={'add '} draft={draft} styleClass={'addButton'}>
            <CardEditor
            {...props}
            type={type}
            newCard={true}
            parent={parent}/>
          </ModalLauncher>
  );
};

export default AddNew;
