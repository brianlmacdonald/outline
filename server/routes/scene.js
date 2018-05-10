'use strict';
const router = require('express').Router();
const { Scene } = require('APP/db');
const Sequelize = require('sequelize');

module.exports = router;

router.post('/:sequenceId', (req, res, next) => {
  return Scene.create(req.body)
  .then(newCard => newCard.setSequence(req.params.sequenceId))
  .then(updatedCard => res.sendStatus(200))
  .catch(next);
});

router.put('/:sceneId', (req, res, next) => {
  return Scene.findOne({where: {id: req.params.sceneId}})
    .then(foundCard => foundCard.update(req.body))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});

router.delete('/:sceneId/', (req, res, next) => {
  return Scene.destroy({where: {id: req.params.sceneId}})
  .then(destroyedScene => res.sendStatus(204))
  .catch(next);
});
