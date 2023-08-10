const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'instructor',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  skills: [{
    type: String,
    required: true
  }],
  quiz: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz'
  }],
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'videos',
  }],
  certificates: [{
    type: String,
    // ref: 'certificate',
    required: true
  }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
