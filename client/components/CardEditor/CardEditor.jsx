'use strict';
import React, { Component } from 'react';
import { 
  PROJECT_TYPE,
  CARD_TYPE_ID,
  CARD_TYPE_PARENT,
  CARD_TYPE_ACTS,
  CARD_TYPE_BEATS,
  CARD_TYPE_SCENES,
  CARD_TYPE_SEQUENCES,
  CARD_TYPE_INDEX,
  CARD_TYPE_BODY,
  CARD_TYPE_TITLE,
  CARD_TYPE_TYPE
} from '../../store';
import { 
  creatingNewProject,
  discardDraft,
  createNewAct,
  createNewDraftCardThunk,
  persistProjectToDB 
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
    if (!window.confirm('Are you sure you want to delete this card?')) {
      return;
    }
  }

  render() {
    const { draft, user, handleSave } = this.props;
    return (
      <div
      className={'cardEditor'}>
        <form>
          <textarea
          value={draft.get('body')}
          >
          </textarea>
        </form>
        <button
        onClick={(evt) => {
          evt.preventDefault();
          return handleSave({
            userId: user.get('id'),
            card: draft
          });
        }}
        >save</button>
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
  handleSave(saveObj){
    dispatch(persistProjectToDB(saveObj));
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

