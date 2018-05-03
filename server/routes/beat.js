'use strict';
const router = require('express').Router();
const { Beat } = require('APP/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = router;

router.post('/:sceneId/', (req, res, next) => {
  return Beat.create(req.body)
  .then(newCard => newCard.setScene(req.params.sceneId))
  .then(res.json.bind(res))
  .catch(next);
});

router.put('/:beatId', (req, res, next) => {
  return Beat.findOne({where: {id: req.params.beatId}})
    .then(foundCard => foundCard.update(req.body))
    .then(updatedCard => res.sendStatus(204))
    .catch(next);
});
