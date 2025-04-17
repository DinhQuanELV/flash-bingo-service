const puppeteer = require('puppeteer');

const Bingo = require('../models/Bingo');
const Module = require('../models/Module');
const { validateObjectId } = require('../utils/validateType');
const { generateBingoCards, generateHTML } = require('../utils/bingo');

const bingoController = {
  // [POST] /bingo/generate/:moduleId
  generate: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      validateObjectId(moduleId);

      const bingoCards = await generateBingoCards(moduleId, 30);

      return res.status(201).json(bingoCards);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /bingo/show/:moduleId/:index
  show: async (req, res, next) => {
    try {
      const { moduleId, index } = req.params;
      const indexNum = parseInt(index, 10);

      if (isNaN(indexNum) || indexNum < 1 || indexNum > 30) {
        return res.status(400).json({ message: 'Index must be a number between 1 and 30!' });
      }

      const bingo = await Bingo.findOne({ moduleId, index }).populate('moduleId', 'title');
      if (!bingo) {
        return res.status(404).json({ message: 'Bingo not found!' });
      }

      return res.status(200).json(bingo);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /bingo/download/pdf/:moduleId
  downloadPDF: async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      validateObjectId(moduleId);

      const bingoCards = await Bingo.find({ moduleId }).populate('moduleId', 'title');
      if (bingoCards.length === 0) {
        return res.status(404).json({ message: 'No bingo card found!' });
      }

      const html = generateHTML(bingoCards);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      await browser.close();

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="MIL_BINGO_Player_card.pdf"',
      });

      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bingoController;
