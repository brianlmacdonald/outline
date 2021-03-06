'use strict';
const router = require('express').Router();
const { Project, User, Act, Sequence, Scene } = require('APP/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = router;

router.param('userId', (req, res, next, id) => {
  User.findOne({where: {id: {[Op.eq]: id}}})
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
//for now loading everything, development only
router.get('/:userId', (req, res, next) => {
  return Project.findAll({where: {user_id:{[Op.eq]: req.user.id}}})
  .then(res.json.bind(res))
  .catch(next);
});

//create a new project. 
//No scope is called on this project,
//since it has no acts.
router.post('/:userId', (req, res, next) => {
  return Project.create()
  .then(newProject => newProject.setUser(req.user.id))
  .then(res.json.bind(res))
  .catch(next);
});

//get and load one single project.
router.get('/:userId/:projectId', (req, res, next) => {
  return Project.scope('acts').find({
    where: {
      [Op.and]: [{user_id: {[Op.eq]: req.user.id}}, {id: {[Op.eq]: req.params.projectId}}]},
    include: [
							{ model: Act, include: [
								{ model: Sequence, include: [
                  { model: Scene.scope('beats') }
                ]}]
								}]
    }
    )
    .then(res.json.bind(res))
    .catch(next);
});

router.put('/:projectId', (req, res, next) => {
  return Project.find({where: {id: {[Op.eq]: req.params.projectId}}})
  .then(foundProject => foundProject.update(req.body))
  .then(updatedProject => res.sendStatus(204))
  .catch(next);
});

router.delete('/:userId/:projectId', (req, res, next) => {
  return Project.destroy({
    where: {
      [Op.and]: [{user_id: {[Op.eq]: req.user.id}}, {id: {[Op.eq]: req.params.projectId}}]},
  })
  .then(destroyedProject => res.sendStatus(204))
  .catch(next);
});
