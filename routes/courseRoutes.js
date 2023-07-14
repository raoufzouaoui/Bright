const express = require('express')
const router = express.Router()

const { 
    getCourse,
    createCourse,
} = require('../controllers/courseControllers')
router.route('/').post(createCourse)
 router.route('/:id').get(getCourse)
//  .patch(updateQuiz).delete(deleteQuiz).put(editQuiz)

module.exports = router 