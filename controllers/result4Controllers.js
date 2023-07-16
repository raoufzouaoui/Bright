const express = require('express');
const router = express.Router();
const Quiz4 = require('../models/quiz4');
const Result = require('../models/result');

// Submit quiz answers
const submitAnswer =  async (req, res) => {
  try {
    const { user, answers,quiz: quizId } = req.body;
    // Fetch the quiz from the database
    const quiz = await Quiz4.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    let score = 0;
    const response = [];
    let isCorrect ;
    for (let i = 0; i < answers.length; i++) {
      const { questionId, selectedOptionIds } = answers[i];
      // console.log(selectedOptionIds)
      // Find the question in the quiz based on questionId
      const question = quiz.questions.find(q => q._id.toString() === questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      console.log(question)
      response.push({
        question:questionId , // Include the 'question' field
        selectedOptionIds,
        isCorrect,
      });
    }
    
    // Save the quiz results
    const result = new Result({
      user: user, 
      quiz: quizId,
      answers: response,
      score,
    });
    


    await result.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to submit quiz answers' });
  }
};


module.exports = {
    submitAnswer,
  };
  