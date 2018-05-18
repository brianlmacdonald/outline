'use strict';
const router = require('express').Router();
const { Beat } = require('APP/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = router;

router.post('/:sceneId/', (req, res, next) => {
  return Beat.create(req.body)
  .then(newCard => newCard.setScene(req.params.sceneId))
  .then(updatedCard => res.sendStatus(200))
  .catch(next);
});

router.put('/:beatId', (req, res, next) => {
  return Beat.findOne({where: {id: {[Op.eq]: req.params.beatId}}})
    .then(foundCard => foundCard.update(req.body))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});

router.delete('/:beatId/', (req, res, next) => {
  return Beat.destroy({where: {id: {[Op.eq]: req.params.beatId}}})
  .then(destroyedBeat => res.sendStatus(204))
  .catch(next);
});
