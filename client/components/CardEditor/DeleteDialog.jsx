'use strict';
import React from 'react';

const DeleteDialog = props => {
  const { close, handleSubmit } = props;
  return (
    <form onSubmit={(evt) => {
      evt.preventDefault();
      handleSubmit(evt.target.password.value);
      }}>
      <label> enter password
      <input name="password" id="password" type="password" />
      </label>
      <button type="submit">enter</button>
      <button onClick={() => close()} type="cancel">
        cancel
      </button>
    </form>
  );
};

export default DeleteDialog;
