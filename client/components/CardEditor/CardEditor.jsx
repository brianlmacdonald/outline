'use strict';
import React, { Component } from 'react';
import { PROJECT_TYPE } from '../../store';
import { creatingNewProject, discardDraft } from '../../store/index';
import { connect } from 'react-redux';
import axios from 'axios';
import { Map } from 'immutable';

class CardEditor extends Component {
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    const {
      newCard,
      type,
      parentPath,
      handleEdit,
      card, 
      project
    } = this.props;

    if (newCard && type === PROJECT_TYPE) {
      const createdCard = await creatingNewProject()
      .then(id => project.getIn(['userProjects', id]));
      this.setState({draftCard: createdCard});
    } else {
      this.setState({draftCard: card});
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

const ConnectedCardEditor = connect()(CardEditor);
export default ConnectCardEditor;

