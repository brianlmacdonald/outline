const Sequelize = require('sequelize');
const modelMaker = require('./cardModelMaker');
const options = {
  defaultTitle: 'untitled act',
  defaultType: 'ACT_TYPE'
};

module.exports = modelMaker('act', options);

module.exports.associations = function(Act, { Project, Sequence }) {
  Act.belongsTo(Project);
  Act.hasMany(Sequence);
};

module.exports.scopes = function(Act, { Sequence }) {
  Act.addScope('sequences', {
    include: [
      {
        model: Sequence
      }
    ]
  });
};
