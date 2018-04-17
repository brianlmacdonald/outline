'use strict';
import React from 'react';
import { Link } from 'react-router-dom';


export default function Home({props}){
  return (
    <div className={'home'}>
      <Link
      to={'/login'}
      ><button>login</button></Link>
      <Link
      to={'/signup'}
      ><button>signup</button></Link>
    </div>
  );
}
