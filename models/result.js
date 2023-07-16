const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [
    {
      question: {
        type: String,
        required: true
      },
      selectedOptionId: {
        type: [String],
      },
      isCorrect: {
        type: Boolean,
      }
    }
  ],
  score: {
    type: Number,
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
