import React from 'react';
import LoaderHOC from '../HOC/LoaderHOC';
import ThumbnailClickable from '../Thumbnail/ThumbnailClickable';

const ThumbsContainer = props => {
  const { thumbs, navigator, type } = props;

  return thumbs.map((card, idx) => {
    return (
      <ThumbnailClickable
        {...props}
        activeStyle={card.get('id') === navigator.get(type)}
        card={card}
        key={card.get('id') + 'tnc' + type}
        id={card.get('id')}
        index={idx}
      />
    );
  });
};

const WrappedThumbsContainer = LoaderHOC('thumbs')(ThumbsContainer);
export default WrappedThumbsContainer;
