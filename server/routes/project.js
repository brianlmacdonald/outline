'use strict';
const router = require('express').Router();
const { Project, User } = require('APP/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const LoadedProject = Project.scope('all');

module.exports = router;

router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        const err = Error('User not found');
        err.status = 404;
        throw err;
      }
      req.user = user;
      next();
      return null;
    })
    .catch(next);
});

//finding all active projects for a user.
//only loads Id and title. This serves a
//thumbnail purpose. If none are found,
//we make a later call to create a new project.
router.get('/:userId', (req, res, next) => {
  return Project.findAll({
    where: {user_id: req.user.id},
    attributes: ['id', 'title'],
  })
  .then(res.json.bind(res))
  .catch(next);
});

//create a new project. No scope is called on this project,
//since it has no notes or acts.
router.post('/:userId', (req, res, next) => {
  return Project.create(req.body)
  .then(newProject => newProject.setUser(req.user.id))
  .then(res.json.bind(res))
  .catch(next);
});

//get and load one single project.
router.get('/:userid/:projectId', (req, res, next) => {
  return LoadedProject.find({
    where: {
      [Op.and]: [{user_id: req.user.id}, {id: req.params.projectId}]}}
    )
    .then(res.json.bind(res))
    .catch(next);
});
