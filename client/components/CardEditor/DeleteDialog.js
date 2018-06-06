'use strict';
import React from 'react';
import 'APP/client/components/CardEditor/DeleteDialog.css';

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
      <div className='dialogButtonGroup'>
      <button className='dialogButtons' type="submit">delete</button>
      <button className='dialogButtons' onClick={() => close()} type="cancel">
        cancel
      </button>
      </div>
    </form>
    </div>
  );
};

export default DeleteDialog;
