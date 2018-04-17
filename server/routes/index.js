const router = require('express').Router();
const project= require('./project');

router.use('/projects', project);


module.exports = router;