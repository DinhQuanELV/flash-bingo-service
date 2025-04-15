const Bingo = require('../models/Bingo');
const Module = require('../models/Module');
const { validateObjectId } = require('../utils/validateType');
const { generateBingoCards } = require('../utils/bingo');

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

  // [GET] /bingo/show/:bingoId
  show: async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bingoController;
