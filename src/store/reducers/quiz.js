const initialState = {
  quizes: [],
  error: null,
  results: {},
  finishedQuiz: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  loading: true
}

export default function quizReducer(state = initialState, action) {

  switch(action.type) {
    case 'FETCH_QUIZES_START':
      return {
        ...state
      }
    case 'FETCH_QUIZES_SUCCESS':
      return {
        ...state, 
        quizes: action.quizes
      }
    case 'FETCH_QUIZES_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'FETCH_QUIZ_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'FETCH_QUIZ_SUCCESS':
      return {
        ...state,
        quiz: action.quiz,
        loading: false
      }
    case 'FETCH_QUIZ_START':
      return {
        ...state,
        loading: true
      }
    case 'RETRY_QUIZ':
      return {
        ...state,
        results: {},
        finishedQuiz: false,
        activeQuestion: 0,
        answerState: null
      }
    case 'SET_ANSWER_STATE':
      return {
        ...state,
        answerState: action.state,
        results: action.results
      }
    case 'SET_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: action.questionId,
        answerState: null
      }
    case 'FINISH_QUIZ':
      return {
        ...state,
        finishedQuiz: true
      }
    default: 
      return state
  }

}