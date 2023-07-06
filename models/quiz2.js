const mongoose = require('mongoose');

// quiz type text

const questionSchema  = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
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

const Quiz2 = mongoose.model('Quiz2', quizSchema);

module.exports = Quiz2;
