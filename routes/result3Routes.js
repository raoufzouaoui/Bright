const express = require('express')
const router = express.Router()

const { 
    resultSubmit
} = require('../controllers/result3Controllers');

router.route('/').post(resultSubmit)

module.exports = router 