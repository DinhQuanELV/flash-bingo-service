const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bingoSchema = new mongoose.Schema(
  {
    moduleId: {
      type: ObjectId,
      ref: 'Module',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = bingoSchema;
