const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Question = require('../models/Question');

const questionController = {
  // [POST] /question/create/:moduleId
  create: async () => {
    try {
      //
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
