const mongoose = require('mongoose');

// quiz type checkbox


const questionSchema  = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  answer: [{
    type: String,
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

const Quiz1 = mongoose.model('Quiz1', quizSchema);

module.exports = Quiz1;
