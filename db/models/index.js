'use strict';

const app = require('APP')
    , debug = require('debug')(`${app.name}:models`)
    , metaModels = {
      User: require('./users')
      ,Project: require('./project')
      ,Note: require('./note')
      ,Change: require('./change')
    }
    , {mapValues} = require('lodash');

module.exports = db => {
  const models = mapValues(metaModels, defineModel => defineModel(db));
  console.log(models);
  Object.keys(metaModels)
    .forEach(name => {
      const {associations, instanceMethods, scopes} = metaModels[name];
      if (typeof associations === 'function') {
        debug('associating model %s', name);
        associations.call(metaModels[name], models[name], models);
      }
      if (typeof instanceMethods === 'function') {
        debug('creating instance method for ', name);
        instanceMethods.call(metaModels[name], models[name], models);
      }
      if (typeof scopes === 'function') {
        debug('adding scope for ', name);
        scopes.call(metaModels[name], models[name], models);
      }
    });
  return models;
};
