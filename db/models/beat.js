const Sequelize = require('sequelize');
const modelMaker = require('./cardModelMaker');
const options = {
  defaultTitle: 'untitled beat',
  defaultType: 'BEAT_TYPE'
};

module.exports = modelMaker('beat', options);

module.exports.associations = function(Beat, { Scene }) {
  Beat.belongsTo(Scene);
};
