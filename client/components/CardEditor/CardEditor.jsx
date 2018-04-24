'use strict';
import React, { Component } from 'react';
import { createNew, loadExisting, discardDraft } from '../../store/index';

class CardEditor extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const {
      parentPath,
      handleEdit,
      selfPath,
      card,
      newCard 
    } = this.props;

    if (!selfPath) {
      createNew(parentPath);
    } else {
      loadExisting(selfPath);
    }

    const leaveWarning = 'Are you sure you want to leave this page?';

    this.exitWarning = (event) => {
      if (this.props.draftProject) {
        // This message is ignored in most browsers, but its presence
        // triggers the confirmation dialog
        event.returnValue = leaveWarning;
        return leaveWarning;
      }
    };

    window.addEventListener('beforeunload', this.exitBlocker);
  }

  componentWillUnmount(){
    if (this.props.draftProject) discardDraft();
    window.removeEventListener('beforeunload', this.exitBlocker);
  }

  handleDelete(){
    if (!window.confirm('Are you sure you want to delete this card, as well as your unsaved changes from the current session?')) {
      return;
    }
  }

  render({ handleEdit, card, isNew }) {
    return (
      <div
      className={'cardEditor'}>
        <h1>
          {card.get('title')}
        </h1>
        <p>
          {card.get('body')}
        </p>
      </div>
    );
  }
}

export default CardEditor;

