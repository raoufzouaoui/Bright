const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  answers: [
    {
      question: {
        type: String,
        required: true
      },
      selectedOptionId: {
        type: [String],
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }
  ],
  score: {
    type: Number,
    required: true
  }
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
