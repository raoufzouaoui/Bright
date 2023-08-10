const mongoose = require('mongoose');

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
  options: [optionSchema],
  answer: [{
    type: mongoose.Schema.Types.Mixed,
  }],
  type: {
    type: String,
    enum: ['checkbox', 'text', 'order', 'paragraph'],
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
  questions: [questionSchema]
});

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;
