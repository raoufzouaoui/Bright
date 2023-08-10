const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model('videos', videoSchema);

module.exports = Video;
