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
};

module.exports = bingoController;
