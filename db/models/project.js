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

module.exports.instanceMethods = function(Project, db) {
  Project.prototype.search = async function(searchTerm) {
    const cardSearch = processCard(searchTerm, db); 
    const searchResults = [];
    const self = this;
    const projectResults = await cardSearch('Project', self);
    const navigation = {
      PROJECT_TYPE: null,
      ACT_TYPE: null,
      SEQUENCE_TYPE: null,
      SCENE_TYPE: null,
      BEAT_TYPE: null
    }
    navigation.PROJECT_TYPE = self.id;

    if (projectResults.length) {
      projectResults[0].dataValues.navigation = navigation;
      searchResults.push(projectResults[0]);
    }

    if (!self.acts) {
      return searchResults;
    }
    
    for (const act of self.acts) {
      const actLevelNavigation = Object.assign({}, navigation);
      actLevelNavigation.ACT_TYPE = act.id;
      const actResults = await cardSearch('Act', act);

      if (actResults.length) {
        actResults[0].dataValues.navigation = Object.assign({}, actLevelNavigation);
        searchResults.push(actResults[0]);
      }
      if (act.sequences) {
        for (const sequence of act.sequences) {
          const sequenceLevelNavigation = Object.assign({}, actLevelNavigation);
          sequenceLevelNavigation.SEQUENCE_TYPE = sequence.id;
          const sequenceResults = await cardSearch('Sequence', sequence);

          if (sequenceResults.length) {
            sequenceResults[0].dataValues.navigation = Object.assign({}, sequenceLevelNavigation)
            searchResults.push(sequenceResults[0]);
          }
          if (sequence.scenes) {
            for (const scene of sequence.scenes) {
              const sceneLevelNavigation = Object.assign({}, sequenceLevelNavigation);
              sceneLevelNavigation.SCENE_TYPE = scene.id;
              const sceneResults = await cardSearch('Scene', scene);

              if (sceneResults.length) {
                sceneResults[0].dataValues.navigation = Object.assign({}, sceneLevelNavigation);
                searchResults.push(sceneResults[0]);
              }
              if (scene.beats) {
                for (const beat of scene.beats) {
                  const beatLevelNavigation = Object.assign({}, sceneLevelNavigation);
                  beatLevelNavigation.BEAT_TYPE = beat.id;
                  const beatResults = await cardSearch('Beat', beat);
                  
                  if (beatResults.length) {
                    beatResults[0].dataValues.navigation = Object.assign({}, beatLevelNavigation);
                    searchResults.push(beatResults[0]);
                  }
                }
              }
            }
          }
        }
      }
    }
    return searchResults;
  }
}

function processCard(term, database) {
  return async function(table, card) {
    return await Promise.resolve(card._modelOptions.sequelize.query(`
    SELECT *
    FROM ${database[table].tableName}
    WHERE id=${card.dataValues.id}
    AND
    _search @@ plainto_tsquery('english', :query);
    `, {
      model: database[table],
      replacements: { query: `${term}`}
    }))
    .then(searchResults => searchResults)
    .catch(console.error)
  }
}
