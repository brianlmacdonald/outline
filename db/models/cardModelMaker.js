const Sequelize = require('sequelize');


module.exports = (type, opts) => db => db.define(type, {
  title: {
    type: Sequelize.STRING
    ,allowNull: false
    ,defaultValue: opts.defaultTitle
    ,validate: require('./validations.js')
  },
  body: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: opts.defaultType
  }
});
