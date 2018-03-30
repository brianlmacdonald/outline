const Sequelize = require('sequelize');
const untitledProject = 'untitled_project_' + new Date;

module.exports = db => db.define('project', {
  title: {
    type: Sequelize.STRING
    ,unique: true
    ,allowNull: false
    ,defaultValue: untitledProject
    ,validate: require('./validations.js')
  }
  ,dateCreated: {
    type: Sequelize.DATE
  }
});

module.exports.associations = function(Project, {User, Note}) {
  Project.belongsTo(User);
  Project.hasMany(Note);
};

module.exports.scopes = function(Project, { Note }) {
  Project.addScope('notes', {
    include: [
      {
        model: Note
      }
    ]
  });
};
