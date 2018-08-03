'use strict';
const router = require('express').Router();
const { Project, User, Act, Sequence, Scene, Beat } = require('APP/db');
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
      { model: Act,
        include: [
        { model: Sequence,
          include: [
          { model: Scene, 
            include: Beat,
        }] 
      }]
    }]
  })
  .then(async projects => {
    const results = await searchProjects(req.params.searchTerm, projects);

    return filterUndefined(results);
  })
  .then(res.json.bind(res))
  .catch(next);
});

async function searchProjects(term, projectArray) {
  return await Promise.all(projectArray.map(async proj => {
    return await Promise.resolve(proj.search(term))
    .then(results => {
      if (results.length) {
        return { project: proj, hits: results }
      }
      return;
    })
    .catch(console.error)
  }));
}

function filterUndefined(projects) {
  return projects.filter(project => project !== undefined);
}
