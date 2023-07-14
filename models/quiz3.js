const mongoose = require('mongoose');

// quiz type order

const optionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  sentence: {
    type: String,
    required: true
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  }
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
