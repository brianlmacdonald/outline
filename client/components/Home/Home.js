'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(props){
  const { user } = props;
  const userName = user && user.get('firstName') || null;
  return (
    <div className={'home centeredDiv'}>
    <h1 className='headerBox'>OUTLINE</h1>
    {!userName ?
      <div>
        <Link to={'/login'}>
          <button>login</button>
        </Link>
        <Link to={'/signup'}>
          <button>signup</button>
        </Link>
      </div> :
      <div />
    }
    </div>
  );
}
