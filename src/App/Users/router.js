const express = require('express');
const router = express.Router();
const userController = require('./controller');

router.get('/', userController.index);
router.get('/create', userController.create);

module.exports = router;
