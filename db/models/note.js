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

module.exports.associations = (Note, {Change}) => {
  Note.hasMany(Change);
};

module.exports.scopes = function(Model, {Change}) {
  Model.addScope('changes', {
    include: [
      {
        model: Change
      }
    ]
  });
};
