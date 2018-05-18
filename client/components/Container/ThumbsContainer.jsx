import React from 'react';
import LoaderHOC from '../HOC/LoaderHOC.jsx';
import { Thumbnail } from 'APP/client/components/index.jsx';

const ThumbsContainer = props => {
  const { thumbs, navigator, type } = props;
  console.log(thumbs);

  return thumbs.map((card, idx) => {
    return (
      <Thumbnail
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
