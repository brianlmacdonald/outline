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

router.get('/all-projects/:userId/:searchTerm', (req, res, next) => {
  return Project.scope('acts').findAll({
    where: {
      user_id:{[Op.eq]: req.user.id}},
    include: [
    { model: Act, include: [
      { model: Sequence, include: [
        { model: Scene.scope('beats') }
      ]}]
      }]})
  .then(projects => searchProjects(req.params.searchTerm, projects))
  .then(res.json.bind(res))
  .catch(next);
});

router.get('/single-project/:userId/:projectId/:searchTerm', (req, res, next) => {
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
    .then(project => searchProjects(req.params.searchTerm, [project]))
    .then(res.json.bind(res))
    .catch(next);
});

function searchProjects(term, projectArray) {
  const found = {projects: [], hits: []}
  projectArray.forEach(proj => {
    const results = proj.search(term);
    if (results.length) {
      found.projects.push(proj);
      found.hits.push(results);
    }
  })
  return found;
}
