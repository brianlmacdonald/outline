'use strict';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(props){
  const { user } = props;
  const userName = user && user.get('firstName') || null;
  console.log(props);
  return (
    <div className={'home'}>
    {!userName ?
      <div>
        <h1>outline</h1>
        <Link to={'/login'}>
          <button>login</button>
        </Link>
        <Link to={'/signup'}>
          <button>signup</button>
        </Link>
      </div> :
      <div>
        <h1>outline</h1>
      </div>
    }
    </div>
  );
}
