const express = require('express')
const router = express.Router()

const { 
    resultSubmit
} = require('../controllers/result1Controllers');

router.route('/').post(resultSubmit)

module.exports = router 