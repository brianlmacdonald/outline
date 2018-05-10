'use strict';
const router = require('express').Router();
const { Sequence } = require('APP/db');
const Sequelize = require('sequelize');

module.exports = router;

router.post('/:actId', (req, res, next) => {
  return Sequence.create(req.body)
  .then(newCard => newCard.setAct(req.params.actId))
  .then(updatedCard => res.sendStatus(200))
  .catch(next);
});

router.put('/:sequenceId', (req, res, next) => {
  return Sequence.findOne({where: {id: req.params.sequenceId}})
    .then(foundCard => foundCard.update(req.body))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});

router.delete('/:sequenceId/', (req, res, next) => {
  return Sequence.destroy({where: {id: req.params.sequenceId}})
  .then(destroyedSequence => res.sendStatus(204))
  .catch(next);
});
