'use strict';
import React, { Component } from 'react';
import { PROJECT_TYPE, CARD_TYPE_ID } from '../../store';
import { 
  creatingNewProject,
  discardDraft,
  createNewAct,
  createNewDraftCardThunk 
} from '../../store/index';
import { connect } from 'react-redux';
import axios from 'axios';
import { Map } from 'immutable';

//add the save warnings to the modal click / nav events.
//right now if you click away there will be no save check.

class CardEditor extends Component {
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    const {
      handleNewProject,
      handleNewDraft,
      newCard,
      type,
      parentPath,
      handleEdit,
      card, 
      project,
      user
    } = this.props;

    if (newCard && type === PROJECT_TYPE) {
        const newProjectId = await handleNewProject(user.get('id'));
        handleNewDraft(newProjectId);
    } else if (newCard) {
      const createdCard = await createNewAct(parentPath)
      .then(id => createNewAct(parentPath));      
    } else {
      createNewDraftCardThunk(card);
    }

    const leaveWarning = 'Are you sure you want to leave this page?';

    this.exitWarning = (event) => {
      if (!this.props.draft.get(CARD_TYPE_ID)) {
        // This message is ignored in most browsers, but its presence
        // triggers the confirmation dialog
        event.returnValue = leaveWarning;
        return leaveWarning;
      }
    };

    window.addEventListener('beforeunload', this.exitBlocker);
  }

  componentWillUnmount(){
    if (this.props.draft) discardDraft();
    window.removeEventListener('beforeunload', this.exitBlocker);
  }

  handleDelete(){
    if (!window.confirm('Are you sure you want to delete this card, as well as your unsaved changes from the current session?')) {
      return;
    }
  }

  render() {
    const { draft } = this.props;
    return (
      <div
      className={'cardEditor'}>
        <h1>
          {draft.get('type')}
        </h1>
        <p>
          {draft.get('id')}
        </p>
      </div>
    );
  }
}

const MapState = state => ({
  project: state.project,
  draft: state.draft,
  user: state.user
});

const MapDispatch = dispatch => ({
  handleNewProject(userId){
    return dispatch(creatingNewProject(userId));
  },
  handleNewDraft(card){
    dispatch(createNewDraftCardThunk(card));
  },
  handleSave(){
    //persist in db through project
  },
  handleReset(){
    //reload the card from project
  },
  handleDelete(){
    //delete the card
  },
  handleCancel(){
    //clear draft state.
  }
});

const ConnectedCardEditor = connect(MapState, MapDispatch)(CardEditor);
export default ConnectedCardEditor;

