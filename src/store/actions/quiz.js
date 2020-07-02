import axios from 'axios';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from './actionsTypes';

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