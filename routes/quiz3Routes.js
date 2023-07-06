const express = require('express')
const router = express.Router()

const { 
    getAllQuiz,
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    editQuiz
} = require('../controllers/quiz3Controllers')

router.route('/').get(getAllQuiz).post(createQuiz)
router.route('/:id').get(getQuiz).patch(updateQuiz).delete(deleteQuiz).put(editQuiz)

module.exports = router 