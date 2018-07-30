'use strict';
import React from 'react';
import 'APP/client/components/SearchBar/Suggestions.css';

const Suggestions = (props) => {

  const matches = props.results.map(projHit => {
    if (projHit.found.length === 0) return;
    return(<li key={projHit.project}>
            <h4 className='has-text-success'>{projHit.project}</h4>
            <ul>{projHit.found.map(r => (
              <li key={r.hit.get('id')}>
                <div>
                  <div>
                    <h4>{r.hit.get('title')}</h4>
                    <p>{r.hit.get('body')}</p>
                  </div>
                </div>
              </li>))}
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
