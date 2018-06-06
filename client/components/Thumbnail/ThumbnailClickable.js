import React from 'react';
import { Link } from 'react-router-dom';
import CardView from 'APP/client/components/CardView/CardView';
import ModalLauncher from 'APP/client/components/HOC/ModalLauncher';
import LoaderHOC from 'APP/client/components/HOC/LoaderHOC';
import 'APP/client/components/Thumbnail/Thumbnail.css';

const selectedStyler = (id, activeId) => {
  if (id === activeId) return 'thumbnail selected';
  else return 'thumbnail unSelected';
};

const ThumbnailClickable = (props) => {
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
  const freezeNavigation = draft.get('type') !== null;
  //freezeNav prevents navigation when someone is editing.

  return (
      <div
        title={body}
        className={selectedStyler(location, navigator.get(type))}
        key={id + 'd'}
        onDoubleClick={() =>{
          if (!freezeNavigation) {
            handleNavigation({id: location, userId});
          } 
        }}>
        <h4 key={id + 'h4'}>{titlePrev}</h4>
        <p key={id + 'p'}>{bodyPrev || ''}</p>
        <div className='modalDiv'>
          <ModalLauncher
          {...props}
          message={'open '}
          draft={draft}
          styleClass={'button'}
          type={type}>
            <CardView {...props} />
          </ModalLauncher>
        </div>
      </div>
  );
};

export default LoaderHOC('id')(ThumbnailClickable);
