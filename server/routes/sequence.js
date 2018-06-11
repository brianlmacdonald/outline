'use strict';
const router = require('express').Router();
const { Sequence } = require('APP/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = router;

router.post('/:actId', (req, res, next) => {
  return Sequence.create(req.body)
  .then(newCard => newCard.setAct(req.params.actId))
  .then(updatedCard => res.sendStatus(200))
  .catch(next);
});

router.put('/parent/:sequenceId/:parentId', (req, res, next) => {
  return Sequence.findOne({where: {id: {[Op.eq]: req.params.sequenceId}}})
    .then(foundCard => foundCard.setAct(req.params.parentId))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});

router.put('/:sequenceId', (req, res, next) => {
  return Sequence.findOne({where: {id: {[Op.eq]: req.params.sequenceId}}})
    .then(foundCard => foundCard.update(req.body))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});

router.delete('/:sequenceId', (req, res, next) => {
  return Sequence.destroy({where: {id: {[Op.eq]:req.params.sequenceId}}})
  .then(destroyedSequence => res.sendStatus(204))
  .catch(next);
});
