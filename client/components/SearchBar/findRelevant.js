'use strict';
import { List, Map } from 'immutable';

const childCard = {
  PROJECT_TYPE: 'acts',
  ACT_TYPE: 'sequences',
  SEQUENCE_TYPE: 'scenes',
  SCENE_TYPE: 'beats',
  BEAT_TYPE: null
};

const navigationCard = Map({
  'PROJECT_TYPE': null,
  'ACT_TYPE': null,
  'SEQUENCE_TYPE': null,
  'SCENE_TYPE': null,
  'BEAT_TYPE': null
});

function hasTerm(card, key, term) {
  const isText = card.get(key);
  return isText.match(term) !== null;
}

//I made both an iterative and recursive search. Currently the iterative is plugged in.

function findRelevant(projectCard, searchTerm) {
  const found = List();

  function recursiveFind(card, navigation) {
    const newNavigation = navigation.set(card.get('type'), card.get('id'));
    
    if (hasTerm(card, 'body', searchTerm) || hasTerm(card, 'title', searchTerm)) {
      found.push({card, navigation: newNavigation})
    }

    if (card.get('type') === 'BEAT_TYPE') return;

    const nextCardArray = card.get(childCard[card.get('type')]);

    if (nextCardArray === undefined) return;
    nextCardArray.map(c => {
      return recursiveFind(c, newNavigation);
    });
  }

  recursiveFind(projectCard, navigationCard);

  return found;
}

export default function iterativeFind(projectCard, searchTerm){
  const found = [];

  navigationCard.set('PROJECT_TYPE', projectCard.get('id'));

  hasChildren(projectCard) && projectCard.get('acts').forEach(act => {
    const actResults = processCard(act, navigationCard, searchTerm);
    if (actResults.hit !== null) {
      found.push(actResults);
    }
    hasChildren(act) && act.get('sequences').forEach(sequence => {
      const seqResults = processCard(sequence, actResults.navigation, searchTerm);
      if (seqResults.hit !== null) {
        found.push(seqResults);
      }
      hasChildren(sequence) && sequence.get('scenes').forEach(scene => {
        const sceneResults = processCard(scene, seqResults.navigation, searchTerm);
        if (sceneResults.hit !== null) {
          found.push(sceneResults);
        }
        hasChildren(scene) && scene.get('beats').forEach(beat => {
          const beatResults = processCard(beat, sceneResults.navigation, searchTerm);
          if (beatResults.hit !== null) {
            found.push(beatResults);
          }
        });
      });
    });  
  });
  return found;

}

function hasChildren(card) {
  return card.get(childCard[card.get('type')]) !== undefined;
}

function processCard(card, navigation, term) {
  const newNavigation = navigation.set(card.get('type'), card.get('id'));
  const resultsObj = {'hit': null, 'navigation': newNavigation};
  if (hasTerm(card, 'body', term) || hasTerm(card, 'title', term)) {
    resultsObj.hit = card;
  }
  return resultsObj;
}


