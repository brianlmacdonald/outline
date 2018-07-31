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
    
    if (projectResults.length) {
      searchResults.push(projectResults);
    }

    if (!self.acts) {
      return searchResults;
    }
    
    for (const act of self.acts) {
      const actResults = await cardSearch('Act', act);

      if (actResults.length) {
        searchResults.push(actResults);
      }
      if (act.sequences) {
        for (const sequence of act.sequences) {
          const sequenceResults = await cardSearch('Sequence', sequence);

          if (sequenceResults.length) {
            searchResults.push(sequenceResults);
          }
          if (sequence.scenes) {
            for (const scene of sequence.scenes) {
              const sceneResults = await cardSearch('Scene', scene);

              if (sceneResults.length) {
                searchResults.push(sceneResults);
              }
              if (scene.beats) {
                for (const beat of scene.beats) {
                  const beatResults = await cardSearch('Beat', beat);
                  
                  if (beatResults.length) {
                    searchResults.push(beatResults);
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
