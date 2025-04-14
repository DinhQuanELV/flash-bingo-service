const Module = require('../models/Module');
const Question = require('../models/Question');
const {
  validateString,
  validateArray,
  validateObjectId,
} = require('../utils/validateType');

const questionController = {
  // [POST] /question/create/:moduleId
  create: async (req, res, next) => {
    try {
      // get value
      const { moduleId } = req.params;
      const { keyword, title, correctAnswer, wrongAnswers } = req.body;

      // check exist module
      const module = await Module.findById(moduleId);
      if (!module) {
        return res.status(404).json({ message: 'Module not found!' });
      }

      // validate value
      if (!keyword || !title || !correctAnswer || !wrongAnswers) {
        return res.status(400).json({ message: 'Please type content!' });
      }

      validateObjectId(moduleId, 'moduleId');
      validateString(keyword, 'keyword');
      validateString(title, 'title');
      validateString(correctAnswer, 'correctAnswer');
      validateArray(wrongAnswers, 'wrongAnswers');

      // check exist question
      const existsQuestion = await Question.findOne({ moduleId, title });
      if (existsQuestion) {
        return res.status(409).json({ message: 'Question already exists!' });
      }

      // check keyword is exits in module
      if (!module.keywords.includes(keyword)) {
        return res.status(400).json({ message: 'Keyword is not exist!' });
      }

      // create new question
      const question = new Question({
        moduleId,
        keyword,
        title,
        correctAnswer,
        wrongAnswers,
      });
      await question.save();

      return res.status(201).json({
        message: 'Create question successfully!',
        question,
      });
    } catch (error) {
      next(error);
    }
  },

  // [GET] /question/show/all/:moduleId
  showAll: async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      validateObjectId(moduleId, 'moduleId');

      const module = await Module.findById(moduleId);
      if (!module) {
        return res.status(404).json({ message: 'Module not found!' });
      }

      const questions = await Question.find({ moduleId }).lean();
      if (questions.length === 0) {
        return res.status(200).json({
          message: 'This module does not have any questions yet!',
          questions: [],
        });
      }

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },

  // [GET] /question/show/:questionId
  show: async () => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },

  // [PATCH] /question/update/:questionId
  update: async () => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },

  // [DELETE] /question/delete/:questionId
  delete: async () => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },
};

module.exports = questionController;
