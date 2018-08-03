'use strict';
import React from 'react';
import 'APP/client/components/SearchBar/Suggestions.css';

const Suggestions = (props) => {
  const {
    results,
    handleNavigation,
    hide
  } = props;
  const matches = results.map(hit => {
    return(
      <li key={`project-hit-${hit.id}-li`}>
        <ul className='menu-list' key={`project-hit-${hit.id}-ul`}>
          <p className='menu-label' key={`project-hit-${hit.id}-h4`}>{hit.title}</p>
            {hit.hits.map(r => {
              return (
                <li key={r.id}>
                  <a><div className='suggestion-item' onClick={() => {handleNavigation(r.navigation)}}>
                    <h4>{r.title}</h4>
                    <p>{r.body}</p>
                  </div></a>
                </li>
              )
            })}
        </ul>
      </li>
  )});

  if (matches.length === 0 || hide) return <div />;

  return (
    <div className='suggestions-div'>
      <div className='suggestion-bubble menu'>
        <ul className='suggestion-list menu-list'>{matches}</ul>
      </div>
    </div>);
};

export default Suggestions;
