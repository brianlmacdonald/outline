const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db => db.define('note', {
  title: {
    type: Sequelize.STRING
    ,allowNull: false
    ,validate: require('./validations')
  }
  ,body: {
    allowNull: false
    ,type: Sequelize.TEXT
  }
});

module.exports.associations = (Note, {Change, Project}) => {
  Note.hasMany(Change);
  Note.belongsTo(Project);
};

module.exports.scopes = function(Note, {Change}) {
  Note.addScope('defaultScope', {
    include: [
      {
        model: Change
      }
    ]
  }, {override: true});
};
