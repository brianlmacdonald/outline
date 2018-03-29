const Sequelize = require('sequelize');
const valueDefault1 = 'positive';
const valueDefault2 = 'negative'; 

module.exports = db => db.define('change', {
  title: {
    type: Sequelize.STRING
    ,validate: require('./validations')
  }
  ,valueIn: {
    type: Sequelize.ENUM(valueDefault1, valueDefault2)
  }
  ,valueOut: {
    type: Sequelize.ENUM(valueDefault1, valueDefault2)
  }
});

module.exports.associations = (Change, {Note}) => {
  Change.belongsTo(Note);
};
