const express = require('express');
const router = express.Router();

const moduleController = require('../controllers/module.controller');
const requireAuth = require('../middleware/requireAuth');

router.post('/create', requireAuth, moduleController.create);
router.get('/show/all', moduleController.showAll);
router.get('/show/:moduleId', moduleController.show);
router.post('/search', moduleController.search);
router.put('/update/:moduleId', requireAuth, moduleController.update);
router.delete('/delete/:moduleId', requireAuth, moduleController.delete);

module.exports = router;
