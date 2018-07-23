'use strict';
import React from 'react';

const Suggestions = (props) => {
  const matches = props.results.map(r => (
    <li key={r.id}>
      {r.name}
    </li>
  ));

  return <ul>{matches}</ul>;
};

export default Suggestions;
