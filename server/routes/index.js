const router = require('express').Router();
const project = require('./project');
const act = require('./act');
const sequence = require('./sequence');
const scene = require('./scene');
const beat = require('./beat');

router.use('/projects', project);
router.use('/acts', act);
router.use('/sequence', sequence);
router.use('/scene', scene);
router.use('/beat', beat);

module.exports = router;