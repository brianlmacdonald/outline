const router = require('express').Router();
const project= require('./project');

router.use('/project', project);


module.exports = router;