const Sequelize = require('sequelize');
const untitledProject = 'untitled_project_' + new Date;
const modelMaker = require('./cardModelMaker');
const options = {
  defaultTitle: untitledProject,
  defaultType: 'PROJECT_TYPE'
};


module.exports = modelMaker('project', options);

module.exports.associations = function(Project, {User, Act}) {
  Project.belongsTo(User);
  Project.hasMany(Act);
};

module.exports.scopes = function(Project, { Act }) {
  Project.addScope('acts', {
    include: [
      {
        model: Act
      }
    ]
  });
};

const childCard = {
  PROJECT_TYPE: 'acts',
  ACT_TYPE: 'sequences',
  SEQUENCE_TYPE: 'scenes',
  SCENE_TYPE: 'beats',
  BEAT_TYPE: null
};

const navigationCard = {
  'PROJECT_TYPE': null,
  'ACT_TYPE': null,
  'SEQUENCE_TYPE': null,
  'SCENE_TYPE': null,
  'BEAT_TYPE': null
};

module.exports.instanceMethods = function(Project) {
  Project.search = function(searchTerm) {
    const cardSearch = processCard(searchTerm);
    const searchResults = [];
    const projectResults = cardSearch(this, navigationCard);
    if (projectResults.hit !== null) {
      searchResults.push(projectResults);
    }
    hasChildren(this) && this.acts.forEach(act => {
      const actResults = cardSearch(act, projectResults.navigation);
      if (actResults.hit !== null) {
        searchResults.push(actResults);
      }
      hasChildren(act) && act.sequences.forEach(sequences => {
        const sequenceResults = cardSearch(sequence, actResults.navigation);
        if (sequenceResults.hit !== null) {
          searchResults.push(sequenceResults);
        }
        hasChildren(sequence) && sequence.scenes.forEach(scene => {
          const sceneResults = cardSearch(scene, sequenceResults.navigation);
          if (sceneResults.hit !== null) {
            searchResults.push(sceneResults);
          }
          hasChildren(scene) && scene.beats.forEach(beat => {
            const beatResults = cardSearch(beat, sceneResults.navigation);
            if (beatResults.hit !== null) {
              searchResults.push(beatResults);
            }
          })
        })
      })
    })
    return searchResults;
  }
}

function processCard(term) {
  return function(card, navigation) {
    const newNavigation = navigation[card.type] = card.id;
    const resultsObj = {'hit': null, 'navigation': newNavigation};
    if (Object.keys(card._search).some(rx => rx.test(term))) {
      resultsObj.hit = card;
    }
    return resultsObj;
  }
}

function hasChildren(card) {
  return card[childCard[card.type]] !== undefined;
}
