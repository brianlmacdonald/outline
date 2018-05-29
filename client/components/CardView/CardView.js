import React from 'react';
import CardEditor from '../CardEditor/CardEditorLoader';
import ModalLauncher from '../HOC/ModalLauncher';

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
        draft={draft}
        styleClass={'button'}
      >
        <CardEditor
          {...props}
          type={type}
          isNewCard={false}
          parent={self}/>
      </ModalLauncher>
      <button className='button' onClick={close}>
        close
      </button>
      </div>
    </div>
  );
};

export default CardView;