'use strict';
import React from 'react';
import 'APP/client/components/SearchBar/Suggestions.css';

const Suggestions = (props) => {
  const { results } = props;
  const matches = results.map(hit => {
    console.log(hit);
    return(<li key={hit.id}>
                <div>
                  <div>
                    <h4>{hit.title}</h4>
                    <p>{hit.body}</p>
                  </div>
                </div>
          </li>
  )});
  if (matches.length === 0) return <div />;
  console.log(matches);
  return (
    <div className='suggestions-div'>
      <div className='suggestion-bubble'>
        <ul className='suggestion-list'>{matches}</ul>
      </div>
    </div>);
};

export default Suggestions;
