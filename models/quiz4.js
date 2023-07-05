const mongoose = require('mongoose');

// quiz type paragraphe

const questionSchema  = new mongoose.Schema({
  question: [{
    type: String,
    required: true
  }]
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

const Quiz4 = mongoose.model('Quiz4', quizSchema);

module.exports = Quiz4;
