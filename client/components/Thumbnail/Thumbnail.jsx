'use strict';
import React from 'react';
import './Thumbnail.css';

const draggedStyler = (bool) => {
  if (bool) return 'thumbnail dragging';
  else return 'thumbnail';
};

const Thumbnail = (props) => {
  const { card, isDragging } = props;
  const body = card.get('body');
  const title = card.get('title');
  const id = card.get('id');
  const bodyPrev = body.length > 25 ? body.slice(0, 24) + '...' : body;
  const titlePrev = title.length > 15 ? title.slice(0, 14) + '...' : title;
  return (
    <div title={body} className={'thumbnail'} key={id + 'd'}>
        <h4 key={id + 'h4'}>{titlePrev}</h4>
        <p key={id + 'p'}>{bodyPrev || ''}</p>
    </div>

  );
};

export default Thumbnail;
