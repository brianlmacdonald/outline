const Sequelize = require('sequelize');
const untitledProject = 'untitled_project_' + new Date;

module.exports = db => db.define('project', {
  title: {
    type: Sequelize.STRING
    ,unique: true
    ,allowNull: false
    ,defaultValue: untitledProject
    ,validate: require('./validations.js')
  },
  body: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: 'PROJECT_TYPE'
  },
  acts: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
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
