'use strict';
import React from 'react';

const Suggestions = (props) => {

  const matches = props.results.map(r => (
    <li key={r.hit.get('id')}>
      {r.hit.get('title')}
    </li>
  ));

  return <ul>{matches}</ul>;
};

export default Suggestions;
