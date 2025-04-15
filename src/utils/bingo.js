const Module = require('../models/Module');
const Bingo = require('../models/Bingo');
const { APIError } = require('../error');

const getRandomKeywords = (keywords, count) => {
  const shuffled = [...keywords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateBingoCards = async (moduleId, numberOfCards = 30) => {
  try {
    const module = await Module.findById(moduleId).lean();
    if (!module) {
      throw new APIError('Module not found!', 404);
    }

    if (module.keywords.length < 16) {
      throw new APIError('Module must have at least 16 keywords!', 400);
    }

    // delete all old bingo card
    await Bingo.deleteMany({ moduleId }).lean();

    // generate bingo card
    const bingoCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      const keywords = getRandomKeywords(module.keywords, 16);
      bingoCards.push({
        moduleId,
        index: i + 1,
        title: module.title,
        keywords,
      });
    }

    const savedCards = await Bingo.insertMany(bingoCards);
    return savedCards;
  } catch (error) {
    throw new APIError('Error generate bingo card!', 500);
  }
};

module.exports = { getRandomKeywords, generateBingoCards };
