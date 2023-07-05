const mongoose = require('mongoose');

// quiz type order

const questionSchema  = new mongoose.Schema({
  question: [{
    type: String,
    required: true
  }],
  answer: [{
    type: Number,
    required: true
  }],
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [questionSchema],
});

const Quiz3 = mongoose.model('Quiz3', quizSchema);

module.exports = Quiz3;
