const Quiz = require('../models/quiz2')
// const asyncWrapper = require('../middleware/async')


const getAllQuiz =  async (req,res) => {
    const quiz = await Quiz.find({})
    res.status(200).json({ quiz })
}

const createQuiz = async (req, res) => {
    try{
        const quiz = await Quiz.create(req.body)
    res.status(201).json({quiz})
    }catch (error){
        res.status(500).json({ msg : error })
    }
}

const getQuiz = async (req,res) => {
    try{
        const {id:quizID} = req.params
        const quiz = await Quiz.findOne({_id:quizID});
        if(!quiz){
            return res.status(404).json({msg:`No quiz with id : ${quizID}`})
        }
        res.status(200).json({ quiz })
    }catch{
        res.status(500).json({ msg : error })
    }
}

const deleteQuiz = async (req,res) => {
    try{
        const {id:quizID} = req.params;
        const quiz = await Quiz.findByIdAndDelete({_id:quizID})
        if(!quiz){
            return res.status(404).json({msg:`No quiz with id : ${quizID}`})
        }

        res.status(200).json({ quiz })
    }catch{
        res.status(500).json({ msg : error })
    }
}


const updateQuiz = async (req,res) => {
    try{
        const { id: quizID } = req.params;

        const quiz = await Quiz.findOneAndUpdate({ _id:quizID } , req.body ,{
            new: true,
            runValidators: true,
        })

        if(!quiz) {
            return res.status(404).json({msg:`No quiz with id : ${quizID}`})
        }
        res.status(200).json({ quiz })
    }catch{
        res.status(500).json({ msg : error })
    }
}


const editQuiz = async (req,res) => {
    try{
        const { id: quizID } = req.params;

        const quiz = await Quiz.findOneAndUpdate({ _id:quizID } , req.body ,{
            new: true,
            runValidators: true,
            overwrite: true,
        })

        if(!quiz) {
            return res.status(404).json({msg:`No quiz with id : ${quizID}`})
        }
        res.status(200).json({ quiz })
    }catch{
        res.status(500).json({ msg : error })
    }
}

module.exports = {
    getAllQuiz,createQuiz,getQuiz,updateQuiz,deleteQuiz,editQuiz
}