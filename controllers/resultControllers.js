const Quiz = require('../models/quiz');
const Result = require('../models/result');

const resultSubmit = async (req, res) => {
  const { user, quiz: quizId, answers } = req.body;
  const questionIds = answers.map((item) => item.questionId);

  // Fetch the quiz from the database
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404).json({ error: 'Quiz not found' });
    return;
  }

  let score = 0;
  const response = [];

  for (let i = 0; i < questionIds.length; i++) {
    const questionId = questionIds[i];
    const userAnswer = answers[i];
    let selectedOptionIds;
    if (userAnswer.selectedOptionIds) {
      selectedOptionIds = userAnswer.selectedOptionIds.map(option => option);
    }
    //  console.log(question)
    // console.log("-------------")
    // Find the question in the quiz based on questionId
    const question = quiz.questions.find((q) => q._id.toString() === questionId);
    // console.log(question)
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    const correctAnswer = question.answer;
    let isCorrect=true;
    for(let i=0;i<correctAnswer.length;i++){
      if (selectedOptionIds[i] === correctAnswer[i]) {
        score += 1;
      }else{
        isCorrect=false;
      }
    }
    
    response.push({
      questionId,
      selectedOptionId: selectedOptionIds,
      isCorrect,
      question: question.question,
    });
  }

  const result = new Result({
    user,
    quiz: quiz._id,
    answers: response,
    score,
  });
  console.log(result)

  try {
    await result.validate();
    await result.save();

    // Check if all answers are correct to determine if the user passed the quiz
    const passed = response.every(answer => answer.isCorrect);
    if (passed) {
      // Proceed to the next video or perform the desired action
      res.status(200).json({ passed: true, message: 'Congratulations! You passed the quiz.' });
    } else {
      // Quiz needs to be repeated to get all correct answers
      res.status(200).json({ passed: false, message: 'Sorry, you did not pass the quiz. Please try again.' });
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  // try {
  //   await result.validate();
  //   await result.save();
  //   res.status(200).json(response);
  // } catch (error) {
  //   console.error('Error submitting answer:', error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
};


const compareAnswers = (userAnswer, correctAnswer) => {
    
  if (userAnswer.length !== correctAnswer.length) {
    return false;
  }

  for (let i = 0; i < userAnswer.length; i++) {
    const userSubAnswer = userAnswer[i];
    const correctSubAnswer = correctAnswer[i];

    if (!arrayEquals(userSubAnswer, correctSubAnswer)) {
      return false;
    }
  }

  return true;
};

const arrayEquals = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
};

module.exports = {
  resultSubmit,
};
