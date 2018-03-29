const Sequelize = require('sequelize');
const untitledProject = 'untitled_project_' + new Date;

module.exports = db => db.define('project', {
  name: {
    type: Sequelize.STRING
    ,unique: true
    ,defaultValue: untitledProject
    ,validate: require('./validations.js')
  }
  ,dateCreated: {
    type: Sequelize.DATE
  }
});

module.exports.associations = function(Project, {User}) {
  Project.belongsTo(User);
};
