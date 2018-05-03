'use strict';
const router = require('express').Router();
const { Act } = require('APP/db');
const Sequelize = require('sequelize');

module.exports = router;

router.post('/:projectId/', (req, res, next) => {
  return Act.create(req.body)
  .then(newCard => newCard.setProject(req.params.projectId))
  .then(res.json.bind(res))
  .catch(next);
});

router.put('/:actId', (req, res, next) => {
  return Act.findOne({where: {id: req.params.actId}})
    .then(foundCard => foundCard.update(req.body))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});
