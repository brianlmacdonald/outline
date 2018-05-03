const Sequelize = require('sequelize');
const modelMaker = require('./cardModelMaker');

const options = {
  defaultTitle: 'untitle Sequence',
  defaultType: 'SEQUENCE_TYPE'
};

module.exports = modelMaker('sequence', options);

module.exports.associations = (Sequence, {Act, Scene}) => {
  Sequence.belongsTo(Act);
  Sequence.hasMany(Scene);
};
