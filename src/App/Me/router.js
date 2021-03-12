const express = require('express');
const router = express.Router();
const meController = require('./controller');

router.get('/stored/courses', meController.stored);
router.get('/trash/courses', meController.trash);

module.exports = router;
