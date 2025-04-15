const express = require('express');
const router = express.Router();

const bingoController = require('../controllers/bingo.controller');
const requireAuth = require('../middleware/requireAuth');

router.get('/generate/:moduleId', requireAuth, bingoController.generate);

module.exports = router;
