'use strict';
import uuid from 'uuid';
import { Map, List } from 'immutable';
import project, { 
  projectLoaded,
  projectLoading,
  projectLoadError,
  allProjectsLoaded, 
  allProjectsLoading, 
  allProjectsLoadError,
  createDraft,
  discardDraft,
  savingDraft,
  draftSaved,
  errorSavingDraft
  } from '../project';

  const bigProjectPayloadFunction = (num) => {
    const obj = {};
    for (let i = 0; i < num; i++) {
      const fakeProject = {
        title: i + ' project test',
        body: 'what' + i,
        id: uuid(),
        acts: [
          {
            title: 'one',
            id: uuid(),
            body: i + ' act one',
            sequences: [
              {
                title: 'one',
                id: uuid(),
                body: i + ' sequence one',
                scenes: [
                  1, 2, 3, 4, 5
                ]
              }, {
                title: 'two',
                id: uuid(),
                body: i + ' sequence two',
                scenes: [6, 7, 8, 9, 10]
              }
            ]
          }, {
            title: 'two',
            id: uuid(),
            body: i + ' act two',
            sequences: [
              {
                title: 'three',
                id: uuid(),
                body: i + ' sequence three',
                scenes: []
              }, {
                title: 'four',
                id: uuid(),
                body: i + ' sequence four',
                scenes: []
              },
              {
                title: 'five',
                id: uuid(),
                body: i + ' sequence five',
                scenes: []
              }, {
                title: 'six',
                id: uuid(),
                body: i + ' sequence six',
                scenes: []
              }
            ]
          }, {
            title: 'three',
            id: uuid(),
            body: i + ' act three',
            sequences: [
              {
                title: 'five',
                id: uuid(),
                body: i + ' sequence seven',
                scenes: []
              }, {
                title: 'six',
                id: uuid(),
                body: i + ' sequence eight',
                scenes: []
              }
            ]
          }
        ]
      };
      obj[fakeProject.id] = fakeProject;
    }
    return obj;
  };
  export const projectPayload = bigProjectPayloadFunction(4);
