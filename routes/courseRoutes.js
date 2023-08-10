const express = require('express')
const router = express.Router()

const { 
    getAllCourse,
    getCourse,
    createCourse,
} = require('../controllers/courseControllers')
router.route('/').get(getAllCourse).post(createCourse)
router.route('/:id').get(getCourse)

module.exports = router 