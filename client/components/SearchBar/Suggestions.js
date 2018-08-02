'use strict';
import React from 'react';
import 'APP/client/components/SearchBar/Suggestions.css';

const Suggestions = (props) => {
  const { results, handleNavigation } = props;
  const matches = results.map(hit => {
    return(
      <li key={`project-hit-${hit.id}-li`}>
        <ul key={`project-hit-${hit.id}-ul`}>
          <h4 key={`project-hit-${hit.id}-h4`}>{hit.title}</h4>
            {hit.hits.map(r => {
              return (
                <li key={r.id}>
                  <div onDoubleClick={() => {handleNavigation(r.navigation)}}>
                    <h4>{r.title}</h4>
                    <p>{r.body}</p>
                  </div>
                </li>
              )
            })}
        </ul>
      </li>
  )});

  if (matches.length === 0) return <div />;
  return (
    <div className='suggestions-div'>
      <div className='suggestion-bubble'>
        <ul className='suggestion-list'>{matches}</ul>
      </div>
    </div>);
};

export default Suggestions;
