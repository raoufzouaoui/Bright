// createCourse.js
const Course = require('../models/course')
const Video = require('../models/video');
const Quiz = require('../models/quiz1');
// const Certificate = require('../models/certificate');


const createCourse = async (req, res) => {
  try {
    const { title, description, time, instructor, skills, videos, quizzes, certificates } = req.body;

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
      quiz1: createdQuizzes.map(quiz => quiz._id),
      certificates ,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Failed to create course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
};


const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course by its ID and populate the associated videos and quizzes
    const course = await Course.findById(courseId)
      .populate('videos')
      .populate('quiz1')
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




// const createCourse = async (req, res) => {
//   try {
//     const { title, description, time, instructor, skills, videoIds, quizIds } = req.body;

//     // Fetch videos based on provided videoIds
//     const videos = await Video.find({ _id: { $in: videoIds } });

//     // Fetch quizzes based on provided quizIds
//     const quizzes = await Quiz.find({ _id: { $in: quizIds } });

//     // Create the course with associated videos and quizzes
//     const course = new Course({
//       title,
//       description,
//       time,
//       instructor,
//       skills,
//       videos: videos.map(video => video._id),
//       quizzes: quizzes.map(quiz => quiz._id),
//     });

//     await course.save();

//     res.status(201).json(course);
//   } catch (error) {
//     console.error('Failed to create course:', error);
//     res.status(500).json({ error: 'Failed to create course' });
//   }
// };


// const createCourse = async () => {
//   try {
//     // Create video
//     const video = new Video({
//       title: 'Introduction to Course',
//       time: '30 minutes',
//     });
//     await video.save();

//     // Create quiz
//     const question1 = new Question({
//       question: 'Question 1',
//       options: ['Option 1', 'Option 2', 'Option 3'],
//       answer: [0],
//     });
//     await question1.save();

//     const question2 = new Question({
//       question: 'Question 2',
//       options: ['Option 1', 'Option 2', 'Option 3'],
//       answer: [1],
//     });
//     await question2.save();

//     const quiz = new Quiz({
//       title: 'Course Quiz',
//       description: 'Test your knowledge',
//       questions: [question1._id, question2._id],
//     });
//     await quiz.save();

//     // Create course
//     const course = new Course({
//       title: 'Course Title',
//       description: 'Course Description',
//       time: '2 hours',
//       instructor: 'John Doe',
//       skills: ['Skill 1', 'Skill 2'],
//       quizzes: [quiz._id],
//       videos: [video._id],
//     });
//     await course.save();

//     // Create certificate (if applicable)
//     const certificate = new Certificate({
//       // Certificate details
//     });
//     await certificate.save();

//     // Update the course with the certificate ID
//     course.certificates.push(certificate._id);
//     await course.save();

//     console.log('Course created:', course);
//   } catch (error) {
//     console.error('Failed to create course:', error);
//   }
// };



// const createQuiz = async  (req, res) => {
//     const {
//       title,
//       instructor,
//       description,
//       time,
//       skills,
//       quizzes,
//       videos,
//       certificates,
//     } = req.body;
  
//     const newCourse = new Course({
//       title,
//       instructor,
//       description,
//       time,
//       skills,
//       quizzes,
//       videos,
//       certificates,
//     });
  
//     newCourse
//       .save()
//       .then((course) => {
//         console.log(course)
//         res.json(course);
//       })
//       .catch((error) => {
//         res.status(500).json({ error: 'Failed to create a new course' });
//       });
//   };
  

//   const getAllQuiz =  async (req,res) => {
//     Course.find()
//       .then((courses) => {
//         res.json(courses);
//       })
//       .catch((error) => {
//         res.status(500).json({ error: 'Failed to retrieve courses' });
//       });
//   };

  module.exports = {
    createCourse,getCourse
}