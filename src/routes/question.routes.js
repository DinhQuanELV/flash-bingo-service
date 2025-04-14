const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question.controller');
const requireAuth = require('../middleware/requireAuth');

router.post('/create/:moduleId', requireAuth, questionController.create);
router.get('/show/all/:moduleId', questionController.showAll);
router.get('/show/:questionId', questionController.show);
router.put('/update/:questionId', requireAuth, questionController.update);
router.delete('/delete/:questionId', requireAuth, questionController.delete);

module.exports = router;
