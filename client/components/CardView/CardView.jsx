import React from 'react';
import { ModalLauncher, CardEditor } from '../index.jsx';
import './CardView.css';

const CardView = (props) => {
  const { card, close, type, navigator, handleDelete, draft } = props;
  const id = card.get('id');
  const self = {id, type};
  //cardview edit, parent is self for the card.
  return (
    <div
    className={'cardView view'}>
      <h1>
        {card.get('title')}
      </h1>
      <p>
        {card.get('body')}
      </p>
      <div className={'buttonGroup'} >
      <ModalLauncher
        message={'edit '}
        type={type}
        isEditing={draft.get('type')}
        styleClass={'button'}
      >
        <CardEditor
          {...props}
          type={type}
          newCard={false}
          parent={self}/>
      </ModalLauncher>
      </div>
    </div>
  );
};

export default CardView;
