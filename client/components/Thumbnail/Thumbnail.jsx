import React from 'react';
import { Link } from 'react-router-dom';
import CardView from '../CardView/CardView.jsx';
import ModalLauncher from '../HOC/ModalLauncher.jsx';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import './Thumbnail.css';

const selectedStyler = (id, activeId) => {
  if (id === activeId) return 'thumbnail selected';
  else return 'thumbnail unSelected';
};

const Thumbnail = (props) => {
  const {
    draft,
    user, 
    id,
    index,
    parent,
    type,
    card,
    handleNavigation,
    handleView,
    avtiveStyle,
    navigator
  } = props;
  const body = card.get('body');
  const title = card.get('title');
  const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
  const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;
  const location = card.get('id');
  const userId = user.get('id');

  return (
      <div
        title={body}
        className={selectedStyler(location, navigator.get(type))}
        key={id + 'd'}
        onDoubleClick={() =>{ 
          handleNavigation({
            id: location,
            userId
          });
          }}>
        <h4 key={id + 'h4'}>{titlePrev}</h4>
        <p key={id + 'p'}>{bodyPrev || ''}</p>
        <div className='modalDiv'>
          <ModalLauncher
          message={'open '}
          isEditing={draft.get('type')}
          styleClass={'button'}
          type={type}>
            <CardView {...props} />
          </ModalLauncher>
        </div>
      </div>
  );
};

export default LoaderHOC('id')(Thumbnail);
