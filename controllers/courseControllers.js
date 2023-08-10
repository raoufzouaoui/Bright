// createCourse.js
const Course = require('../models/course')
const Video = require('../models/video');
const Quiz = require('../models/quiz');
// const Certificate = require('../models/certificate');


const createCourse = async (req, res) => {
  try {
    const { title, description, time, instructor, skills, videos, quizzes, certificates } = req.body;
    console.log(req.body)
    // Create videos
    const createdVideos = await Video.create(videos);

    // Create quizzes
    const createdQuizzes = await Quiz.create(quizzes);

    // Create certificates
    //const createdCertificate = await Certificate.create(certificates);

    // Create the course with associated videos, quizzes, and certificate
    const course = new Course({
      title,
      description,
      time,
      instructor,
      skills,
      videos: createdVideos.map(video => video._id),
      quiz: createdQuizzes.map(quiz => quiz._id),
      certificates ,
    });
    console.log(course)
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Failed to create course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
};


const getAllCourse =  async (req,res) => {
  const course = await Course.find({})
  res.status(200).json({ course })
}

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course by its ID and populate the associated videos and quizzes
    const course = await Course.findById(courseId)
      .populate('videos') // Use 'videos' instead of 'video'
      .populate('quiz')
      .exec();

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Failed to fetch course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};



  module.exports = {
    createCourse,getCourse,getAllCourse
}