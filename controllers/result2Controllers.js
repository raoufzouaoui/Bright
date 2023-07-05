const Quiz = require('../models/quiz2');
const Result = require('../models/result');

const resultSubmit = async (req, res) => {
  const { quiz: quizId, questions, answer } = req.body;

  // Fetch the quiz from the database
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404).json({ error: 'Quiz not found' });
    return;
  }

  let score = 0;
  const response = [];

  for (let i = 0; i < questions.length; i++) {
    const questionId = questions[i];
    const userAnswer = answer[i];

    // Find the question in the quiz based on questionId
    const question = quiz.questions.find((q) => q._id.toString() === questionId);

    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    const correctAnswer = question.answer;
    const isCorrect = compareAnswers(userAnswer, correctAnswer);
    if(isCorrect)
      score +=1;

    response.push({
      isCorrect,
      correctAnswer,
    });
  }

  const result = new Result({
    user: req.user,
    quiz: quiz._id,
    answer,
    score,
  });

  await result.save();
  console.log(result);
  res.status(200).json(response);
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
