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
  PROJECT_NAV,
  updateCard
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
import type { ProjectPathArray } from 'APP/Types/Project';
import history from './../../history.js';
import './CardEditor.css';

const leaveWarning = 'Are you sure you want to leave this page?';
//add the save warnings to the modal click / nav events.
//right now if you click away there will be no save check.

class CardEditor extends Component {
  constructor(props){
    super(props);
    this.ifNullEmptyString = this.ifNullEmptyString.bind(this);
  
  }

  async componentDidMount(){
    const {
      handleNewProject,
      handleNewProjectDraft,
      newCard,
      type,
      parent,
      handleEdit,
      card, 
      project,
      user
    } = this.props;

    if (newCard && type === PROJECT_TYPE) {
        const newProjectId = await handleNewProject(user.get('id'));
        handleNewProjectDraft(['userProjects', newProjectId]);
    } else if (newCard) {
        handleNewCard(Map({type, parent: parent.id, title: `untitled ${type}`, body: ''})) 
    } else {
      handleNewDraft(parent.concat(card.get('index')));
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

  render() {
    const { parent, draft, user, handleSave, handleChange, close } = this.props;

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
            onClick={(evt) => {
              evt.preventDefault();
              handleSave({parent, draft, userId: user.get('id'), projectId: navigator.get(PROJECT_NAV)});
              return close();
            }}
            >save</button>
        </div>
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
  handleNewProjectDraft(projectPath: ProjectPathArray){
    dispatch(createNewDraftCardThunk(projectPath));
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
  handleDelete(){
    //delete the card
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

const ConnectedCardEditor = connect(MapState, MapDispatch)(CardEditor);
export default ConnectedCardEditor;
