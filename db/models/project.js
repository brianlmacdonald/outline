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
