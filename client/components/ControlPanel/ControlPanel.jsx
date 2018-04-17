import React from 'react';
// import style from './ControlPanel.css';

export default function ControlPanel(){
  return(
    <div className='controlPanel'>
      <button>new project</button>
      <button>add story</button>
      <button>add act</button>
      <button>add sequence</button>
      <button>add scene</button>
      <button>add beat</button>
      <button>add character</button>
    </div>
  );
}

/*
story is a panel that holds a limit amt of text and three acts.
acts are panels that holds a lmtd amt of text and btw two to four sequences
sequences are panels that hold scenes. the number is arbitrary atp.
scenes are panels that hold 3 beats.
characters hold stories.
*/
