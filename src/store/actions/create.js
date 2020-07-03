import {CREATE_QUESTION, RESET_QUIZ} from './actionsTypes';
import axios from 'axios';

export function createQuestion(quiz) {
  return {
    type: CREATE_QUESTION,
    quiz
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}

export function createQuiz() {
  return async (dispatch, getState) => {
    await axios.post('https://react-quiz-a70a7.firebaseio.com/quizes.json', getState().create.quiz);

    dispatch(resetQuiz());

  }
}