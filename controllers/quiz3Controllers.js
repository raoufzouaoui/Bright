const Quiz = require('../models/quiz3');

const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuiz = async (req, res) => {
  try {
    const { id: quizID } = req.params;
    const quiz = await Quiz.findOne({ _id: quizID });
    if (!quiz) {
      return res.status(404).json({ error: `No quiz with id: ${quizID}` });
    }
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id: quizID } = req.params;
    const quiz = await Quiz.findByIdAndDelete({ _id: quizID });
    if (!quiz) {
      return res.status(404).json({ error: `No quiz with id: ${quizID}` });
    }
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { id: quizID } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(
      { _id: quizID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!quiz) {
      return res.status(404).json({ error: `No quiz with id: ${quizID}` });
    }
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editQuiz = async (req, res) => {
  try {
    const { id: quizID } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(
      { _id: quizID },
      req.body,
      { new: true, runValidators: true, overwrite: true }
    );
    if (!quiz) {
      return res.status(404).json({ error: `No quiz with id: ${quizID}` });
    }
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQuiz,
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  editQuiz
};
