'use strict';
import React from 'react';

const Editor = (props) => {
  const { type, handleSave, handleReset, handleCancel, handleClose } = props;
  return (
    <div name={type} className={type}>
      <div className='container'>
        <button onClick={handleAdd}>add {type}</button>
    
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

