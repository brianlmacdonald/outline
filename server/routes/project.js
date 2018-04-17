'use strict';
const router = require('express').Router();
const { Project, User } = require('APP/db');

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

router.get('/:userId', (req, res, next) => {
  return Project.findAll({
    where: {user_id: req.user.id},
    attributes: ['id', 'title'],
  })
  .then(res.json.bind(res))
  .catch(next);
});

router.post('/:userId', (req, res, next) => {
  return Project.create(req.body)
  .then(newProject => newProject.setUser(req.user.id))
  .then(res.json.bind(res))
  .catch(next);
});
