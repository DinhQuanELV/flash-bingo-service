const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bingoSchema = new mongoose.Schema(
  {
    moduleId: {
      type: ObjectId,
      ref: 'Module',
      required: true,
    },
    index: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 30,
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

module.exports = mongoose.model('Bingo', bingoSchema);
