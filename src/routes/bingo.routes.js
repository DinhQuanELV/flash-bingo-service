const express = require('express');
const router = express.Router();

const bingoController = require('../controllers/bingo.controller');
const requireAuth = require('../middleware/requireAuth');

router.post('/generate/:moduleId', requireAuth, bingoController.generate);
router.get('/show/:moduleId/:index', bingoController.show);
router.get('/download/pdf/:moduleId', bingoController.downloadPDF);

module.exports = router;
