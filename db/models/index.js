'use strict';

const app = require('APP')
    , debug = require('debug')(`${app.name}:models`)
    , metaModels = {
      User: require('./users')
      ,OAuth: require('./oauth')
    }
    , {mapValues} = require('lodash');

module.exports = db => {
  const models = mapValues(metaModels, defineModel => defineModel(db));
  Object.keys(metaModels)
    .forEach(name => {
      const {associations} = metaModels[name];
      if (typeof associations === 'function') {
        debug('associating model %s', name);
        associations.call(metaModels[name], models[name], models);
      }
    });
  return models;
};
