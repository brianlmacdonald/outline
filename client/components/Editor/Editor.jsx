import React, { Component } from 'react';
import propTypes from 'prop-types';

import TitleEditor from '../Title/TitleEditor.jsx';
import NoteEditor from '../Text/TextEditor.jsx';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: this.props.titleValue,
      noteValue: this.props.noteValue,
    };
  }

  handleChange(stateTarget) {
    return (value) => {
      this.setState({stateTarget: value});
    };
  }

  render() {
    return (
      <div>
        <TitleEditor
        onChange={this.handleChange('titleValue')}
        />
        <NoteEditor
        onChange={this.handleChange('noteValue')}
        />
        <div className='editorButtonGroup'>
          <button>save</button>
          <button>reset</button>
          <button>cancel</button>
          <button>delete</button>
        </div>
      </div>
    );
  }
}

export default Editor;
