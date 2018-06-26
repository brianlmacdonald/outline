'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import 'APP/client/components/Home/Home.css';
import 'APP/client/components/Thumbnail/Thumbnail.css';

export default function Home(props){
  const { user } = props;
  const userName = user && user.get('firstName') || null;
  return (
    <div className={'is-dark centeredDiv tile is-parent'}>
      <div className='tile is-child'>
        <h1 className='header-box'>OUTLINE</h1>
      </div>
    {!userName ?
      <div className='buttons is-centered'>
        <Link to={'/login'}>
          <button className='button is-primary'>login</button>
        </Link>
        <Link to={'/signup'}>
          <button className='button is-info'>signup</button>
        </Link>
      </div> :
      <div />
    }
    </div>
  );
}
