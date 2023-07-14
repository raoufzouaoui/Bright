const mongoose = require('mongoose');
// const Video = require('./video');
// const quiz1 = require('./quiz1');
// const quiz2 = require('./quiz2');
// const quiz3 = require('./quiz3');
// const quiz4 = require('./quiz4');

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
  quiz1: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz1'
  }],
  quiz2: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz2'
  }],
  quiz3: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz3'
  }],
  quiz4: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz4'
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
