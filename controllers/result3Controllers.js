// Import the required models
const Quiz3 = require('../models/quiz3');
const Result = require('../models/result');

// Route handler to handle the submission of user answers
const submitAnswer = async (req, res) => {
  try {
    const { quiz: quizId, answers } = req.body;

    // Fetch the quiz from the database
    const quiz = await Quiz3.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate the score and create the response array
    let score = 0;
    const response = [];

    for (const answer of answers) {
      const { questionId, selectedOptionId } = answer;
      const selectedOptionIds = answers.map((answer) => answer.selectedOptionId);
      console.log(selectedOptionIds)
      // Find the question in the quiz based on questionId
      const question = quiz.questions.find((q) => q._id.toString() === questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }

      const correctOrder = question.options.map((option) => option.id);
      
      let isCorrect = true;
      for (let i = 0; i < selectedOptionIds.length; i++) {
        if (selectedOptionIds[i] === correctOrder[i]) {
          isCorrect = true;
          score += 1;
        }else{
          isCorrect = false;
        }
        console.log(selectedOptionIds[i],"    ",correctOrder[i])
         response.push({
          question: question.question,
          selectedOptionId:selectedOptionIds[i],
          isCorrect,
        });
      }
      break;
      // if (isCorrect && selectedOptionId.length === correctOrder.length) {
      //   score += 1;
      // }

      // Add the response for this question to the array
      
    }

    // Create a new result document
    const result = new Result({
      user: req.user, // Assuming you have user authentication
      quiz: quiz._id,
      answers: response,
      score,
    });

    // Save the result to the database
    await result.save();

    // Send the response back to the client
    res.status(200).json({ score, response });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  submitAnswer,
};
