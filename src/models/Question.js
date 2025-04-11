const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema(
  {
    moduleId: {
      type: ObjectId,
      ref: 'Module',
      required: true,
    },
    keyword: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    wrongAnswers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Question', questionSchema);
