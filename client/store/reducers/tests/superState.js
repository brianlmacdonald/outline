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
    const arr = [];
    for (let i = 0; i < num; i++) {
      const fakeProject = {
        title: i + ' project test',
        body: 'what' + i,
        id: i + 1,
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
                  {
                    title: `scene ${i + 1}`,
                    id: uuid(),
                    body: `what a scene: ${i + 1}`,
                    beats: [
                      {
                        title: `beat ${i + 1}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 1} dollars`
                      }
                    ]
                  }
                ]
              }, {
                title: 'two',
                id: uuid(),
                body: i + ' sequence two',
                scenes: [
                  {
                    title: `scene ${i + 2}`,
                    id: uuid(),
                    body: `what a scene: ${i + 2}`,
                    beats: [
                      {
                        title: `beat ${i + 2}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 2} dollars`
                      }
                    ]
                  }
                ]
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
                scenes: [
                  {
                    title: `scene ${i + 3}`,
                    id: uuid(),
                    body: `what a scene: ${i + 3}`,
                    beats: [
                      {
                        title: `beat ${i + 3}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 3} dollars`
                      }
                    ]
                  }
                ]
              }, {
                title: 'four',
                id: uuid(),
                body: i + ' sequence four',
                scenes: [
                  {
                    title: `scene ${i + 4}`,
                    id: uuid(),
                    body: `what a scene: ${i + 4}`,
                    beats: [
                      {
                        title: `beat ${i + 4}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 4} dollars`
                      }
                    ]
                  }
                ]
              },
              {
                title: 'five',
                id: uuid(),
                body: i + ' sequence five',
                scenes: [
                  {
                    title: `scene ${i + 5}`,
                    id: uuid(),
                    body: `what a scene: ${i + 5}`,
                    beats: [
                      {
                        title: `beat ${i + 5}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 5} dollars`
                      }
                    ]
                  }
                ]
              }, {
                title: 'six',
                id: uuid(),
                body: i + ' sequence six',
                scenes: [
                  {
                    title: `scene ${i + 6}`,
                    id: uuid(),
                    body: `what a scene: ${i + 6}`,
                    beats: [
                      {
                        title: `beat ${i + 6}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 6} dollars`
                      }
                    ]
                  }
                ]
              }
            ]
          }, {
            title: 'three',
            id: uuid(),
            body: i + ' act three',
            sequences: [
              {
                title: 'seven',
                id: uuid(),
                body: i + ' sequence seven',
                scenes: [
                  {
                    title: `scene ${i + 7}`,
                    id: uuid(),
                    body: `what a scene: ${i + 7}`,
                    beats: [
                      {
                        title: `beat ${i + 7}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 7} dollars`
                      }
                    ]
                  }
                ]
              }, {
                title: 'eight',
                id: uuid(),
                body: i + ' sequence eight',
                scenes: [
                  {
                    title: `scene ${i + 8}`,
                    id: uuid(),
                    body: `what a scene: ${i + 8}`,
                    beats: [
                      {
                        title: `beat ${i + 8}`,
                        id: uuid(),
                        body: `john tries to steal ${i + 8} dollars`
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
      arr.push(fakeProject);
    }
    return arr;
  };
  export const projectPayload = bigProjectPayloadFunction(1);
