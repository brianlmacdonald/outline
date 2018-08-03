const router = require('express').Router();
const project = require('./project');
const act = require('./act');
const sequence = require('./sequence');
const scene = require('./scene');
const beat = require('./beat');
const search = require('./search');

router.use('/projects', project);
router.use('/acts', act);
router.use('/sequences', sequence);
router.use('/scenes', scene);
router.use('/beats', beat);
router.use('/search', search);

module.exports = router;