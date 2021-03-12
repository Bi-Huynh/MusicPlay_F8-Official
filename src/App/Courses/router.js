const express = require('express');
const router = express.Router();
const courseController = require('./controller');

router.get('/create', courseController.create);
router.post('/store', courseController.storeCreate);
router.post('/handle-form-action', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.storeEdit);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.storeDelete);
router.delete('/:id/force', courseController.storeForce);
router.get('/:slug', courseController.info);
router.get('/', courseController.home);

module.exports = router;
