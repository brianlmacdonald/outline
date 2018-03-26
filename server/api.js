'use strict';

const api = module.exports = require('express').Router();

api
  .use('/auth', require('./auth'))
  .use('/users', require('./users'));
api.use((req, res) => res.status(404).end());
