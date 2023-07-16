const express = require('express')
const router = express.Router()

const { 
    resultSubmit
} = require('../controllers/resultControllers');

router.route('/').post(resultSubmit)

module.exports = router 