import axios from 'axios';
import { 
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_ERROR,
  RETRY_QUIZ,
  SET_ANSWER_STATE,
  FINISH_QUIZ,
  SET_ACTIVE_QUESTION } from './actionsTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('https://react-quiz-a70a7.firebaseio.com/quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((quiz, index) => {

        quizes.push({
          id: quiz,
          name: `Тест №${index + 1}`
        });

      })

      dispatch(fetchQuizesSuccess(quizes))

    } catch (e) {
      dispatch(fetchQuizesError(e))
    }  
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizStart());

    try {
      const response = await axios.get(`https://react-quiz-a70a7.firebaseio.com/quizes/${quizId}.json`);

      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e){
      dispatch(fetchQuizError(e))
    }
  }
}

export function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START
  }
}

export function fetchQuizSuccess(quiz){
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizError(e) {
  return {
    type: FETCH_QUIZ_ERROR,
    error: e
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}

export function setAnswerState(state, results) {
  return {
    type: SET_ANSWER_STATE,
    state, results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function setActiveQuestion(questionId) {
  return {
    type: SET_ACTIVE_QUESTION,
    questionId
  }
}

export function onAnswerClick(answerId) {
  return (dispatch, getState) => {

    const state = getState().quiz;
    
    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]

      if (state.answerState[key] === 'success') {
        return
      }
    }
  

    if (answerId === question.rightAnswerId) {

      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(setAnswerState({[answerId]: 'success'}, results));

      const timeout = window.setTimeout(() => {

        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(setActiveQuestion(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout);
      }, 1000)

    } else {
      
      results[question.id] = 'error';

      dispatch(setAnswerState({[answerId]: 'error'}, results))
    }
  }
}