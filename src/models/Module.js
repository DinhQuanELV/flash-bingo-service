const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
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

module.exports = mongoose.model('Module', moduleSchema);
