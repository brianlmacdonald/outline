'use strict';
import React from 'react';
import './DeleteDialog.css';

const DeleteDialog = props => {
  const { close, handleSubmit } = props;
  return (
    <div className='dialog'>
    <form onSubmit={(evt) => {
      evt.preventDefault();
      handleSubmit(evt.target.password.value);
      }}>
      <label>to delete, enter password: 
      <input name="password" id="password" type="password" />
      </label>
      <div className='buttonGroup'>
      <button type="submit">delete</button>
      <button onClick={() => close()} type="cancel">
        cancel
      </button>
      </div>
    </form>
    </div>
  );
};

export default DeleteDialog;
