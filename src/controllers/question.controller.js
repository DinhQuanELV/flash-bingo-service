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

      // validate value
      validateObjectId(moduleId, 'moduleId');
      validateString(keyword, 'keyword');
      validateString(title, 'title');
      validateString(correctAnswer, 'correctAnswer');
      validateArray(wrongAnswers, 'wrongAnswers');

      // check exist module
      const module = await Module.findById(moduleId);
      if (!module) {
        return res.status(404).json({ message: 'Module not found!' });
      }

      // check exist question
      const existsQuestion = await Question.findOne({ moduleId, title });
      if (existsQuestion) {
        return res.status(409).json({ message: 'Question already exists!' });
      }

      const question = new Question({
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
  showAll: async () => {
    try {
      //
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
