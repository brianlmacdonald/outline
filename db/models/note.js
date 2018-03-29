const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db => db.define('note', {
  title: {
    type: Sequelize.STRING
    ,validate: require('./validations')
  }
  ,body: {
    type: Sequelize.TEXT
  }
});
