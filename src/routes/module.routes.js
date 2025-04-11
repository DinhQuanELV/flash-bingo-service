const express = require('express');
const router = express.Router();

const moduleController = require('../controllers/module.controller');
const requireAuth = require('../middleware/requireAuth');

router.post('/create', requireAuth, moduleController.create);
router.get('/show/all', requireAuth, moduleController.showAll);
router.get('/show/:moduleId', requireAuth, moduleController.show);
router.post('/search', requireAuth, moduleController.search);
router.put('/update/:moduleId', requireAuth, moduleController.update);
router.delete('/delete/:moduleId', requireAuth, moduleController.delete);

module.exports = router;
