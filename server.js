const express = require('express');
const app = express()
const quiz = require('./routes/quiz1Routes.js')
const quiz2 = require('./routes/quiz2Routes.js')
const quiz3 = require('./routes/quiz3Routes.js')
const result1 = require('./routes/result1Routes.js')
const result2 = require('./routes/result2Routes.js')
const result3 = require('./routes/result3Routes.js')
const course = require('./routes/courseRoutes.js')
const cors = require('cors');
const connectDB = require('./db/connect');
const { connect } = require('mongoose');
require('dotenv').config()  // to keep your secret variables actually secret set up the detenv get the package and we will be able to access them anywhere in our app by using process.env
// const notFound = require('./middleware/not-found')

//middleware
app.use(express.static('./public'))
app.use(express.json()) // if we don't use this then we win't have that data in req.body

//routes
app.use(cors());
app.use('/api/v1/Quiz', quiz) // that's going to be that root route for the tasks router
app.use('/api/v1/Quiz2', quiz2)
app.use('/api/v1/Quiz3', quiz3)
app.use('/api/v1/Quiz3/reorder', quiz3)
app.use('/api/v1/Quiz1/submit', result1)
app.use('/api/v1/Quiz2/submit', result2)
app.use('/api/v1/Quiz3/submit', result3)
app.use('/api/v1/course', course)
const port = 3000

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }catch (error){
        console.log(error)        
    }
}

start()

