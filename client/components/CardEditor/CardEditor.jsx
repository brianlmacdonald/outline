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
  CARD_TYPE_TYPE,
  updateCard
} from '../../store';
import { 
  creatingNewProject,
  discardDraft,
  createNewAct,
  createNewDraftCardThunk,
  createNewDraftCard,
  persistToDB,
  deleteFromDB
} from '../../store/index';
import { connect } from 'react-redux';
import axios from 'axios';
import { Map } from 'immutable';
import type { ProjectPathArray } from 'APP/Types/Project';
import history from './../../history.js';
import './CardEditor.css';
import { ModalLauncher } from '../index.jsx';
import DeleteDialog from './DeleteDialog.jsx';

const leaveWarning = 'Are you sure you want to leave this page?';
//add the save warnings to the modal click / nav events.
//right now if you click away there will be no save check.

class CardEditor extends Component {
  constructor(props){
    super(props);
    this.ifNullEmptyString = this.ifNullEmptyString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  componentDidMount(){
    const {
      handleNewProject,
      handleNewCard,
      handleNavigation,
      newCard,
      type,
      parent,
      card, 
      project,
      user
    } = this.props;

    if (newCard && type === PROJECT_TYPE) {
      handleNewProject(user.get('id'));
    } else if (newCard) {
      handleNewCard(Map({type, parent: parent.id, title: `untitled ${type}`, body: ''}))
      // handleNavigation({ id: parent.id, userId: user.get('id')});
    } else {
      handleNavigation({ id: card.get('id'), userId: user.get('id')});
      handleNewCard(card);
    }

    this.exitWarning = (event) => {
      if (!this.props.draft.get(CARD_TYPE_ID)) {
        event.returnValue = leaveWarning;
        return leaveWarning;
      }
    };

    window.addEventListener('beforeunload', this.exitWarning);

  }

  componentWillUnmount(){
    // const { handleDelete } = this.props;
    // if (this.props.draft.get('id')) handleDelete();
    window.removeEventListener('beforeunload', this.exitWarning);
  }

  ifNullEmptyString(value) {
    return value === null ? '' : value;
  }

  ifNullNoRender(value) {
    //fill in for later;
  }

  handleSubmit(password){
    const { handleDelete, user, card, type, draft, navigator, close } = this.props;
    const userObj = {
      id: user.get('id'),
      email: user.get('email'),
      password,
    };
    const cardObj = {
      type,
      id: draft.get('id')
    }
    const projectId = navigator.get(PROJECT_TYPE);
    const deleteObj = { user: userObj, card: cardObj, projectId }
    handleDelete(deleteObj);
    return close();

  }

  render() {
    const {
      parent,
      draft,
      navigator,
      user,
      type,
      handleSave,
      handleChange,
      newCard,
      close } = this.props;

    return (
      <div
        className={'cardEditor'}>
        <div className={'editorFields'}>
          <input
            className='titleField'
            value={this.ifNullEmptyString(draft.get('title'))}
            type="text"
            onChange={(evt) => {
              handleChange(CARD_TYPE_TITLE)(evt.target.value)
            }}
            />
          <textarea
            className='bodyField'
            value={this.ifNullEmptyString(draft.get('body'))}
            onChange={(evt) => {
              handleChange(CARD_TYPE_BODY)(evt.target.value);
              }}
          />
          <button
            className='button'
            onClick={() => {
              handleSave({
                newCard,
                parent,
                draft,
                userId: user.get('id'),
                projectId: navigator.get(PROJECT_TYPE)});
              return close();
            }}
            >save</button>
          <ModalLauncher
            isEditing={false}
            styleClass={'editButton'}
            type={type}
            message={'delete '}
          ><DeleteDialog handleSubmit={this.handleSubmit} {...this.props}/>
          </ModalLauncher>
        </div>
      </div>
    );
  }
}

const MapDispatch = dispatch => ({
  handleNewProject(userId){
    return dispatch(creatingNewProject(userId));
  },
  handleNewCard(newCard){
    dispatch(createNewDraftCard(newCard))
  },
  handleSave(saveObj){
    dispatch(persistToDB(saveObj));
  },
  handleReset(){
    //reload the card from project
  },
  handleDelete(deleteObj){
    dispatch(deleteFromDB(deleteObj))
  },
  handleCancel(){
    //clear draft state.
  },
  handleChange(cardType){
    return (value) => {
      dispatch(updateCard(cardType, value))
    };
  }
});

const ConnectedCardEditor = connect(null, MapDispatch)(CardEditor);
export default ConnectedCardEditor;
