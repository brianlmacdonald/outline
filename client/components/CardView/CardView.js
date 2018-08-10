import React from 'react';
import ModalLauncher from 'APP/client/components/HOC/ModalLauncherLoader';
import { Link } from 'react-router-dom';
import { CLASS_NAME_OBJ } from 'APP/client/components/HierarchyControl/CardTypes';

import './CardView.css';

const CardView = (props) => {
  const { card, close, type, handleNavigation, user } = props;
  const id = card.get('id');
  const self = {id, type};

  return (
    <div className='modal-card has-text-dark'>
      <header className='modal-card-head'>
        <p className='modal-card-title'>
          {card.get('title')}
        </p>
      </header>
      <section className='modal-card-body'>
        <p>
          {card.get('body')}
        </p>
      </section>
      <footer className='modal-card-foot'>
      <div className='is-centered buttons'>
      <Link to={{
        pathname: '/projects/edit',
        state: {
          card,
          isNewCard: false,
          parent: self,
          type,
          nextIdx: null
        }
      }}
      ><button
      onClick={() => handleNavigation({id: card.get('id'), userId: user.get('id')})}
      className='button'>{`edit ${CLASS_NAME_OBJ[type]}`}</button></Link>
      <button className='button' onClick={close}>
        close
      </button>
      </div>
      </footer>
    </div>
  );
};

export default CardView;
