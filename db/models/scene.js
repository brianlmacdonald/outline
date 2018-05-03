const Sequelize = require('sequelize');
const modelMaker = require('./cardModelMaker');
const options = {
  defaultTitle: 'untitled scene',
  defaultType: 'SCENE_TYPE'
};


module.exports = modelMaker('scene', options);

module.exports.associations = function(Scene, {Sequence, Beat}) {
  Scene.belongsTo(Sequence);
  Scene.hasMany(Beat);
};

module.exports.scopes = function(Scene, { Beat }) {
  Scene.addScope('beats', {
    include: [
      {
        model: Beat
      }
    ]
  });
};
