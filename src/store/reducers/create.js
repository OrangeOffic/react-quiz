const initialState = {
  quiz: []
}

export default function createReducer(state = initialState, action) {
  switch(action.type) {
    case 'CREATE_QUESTION':
      return {
        ...state,
        quiz: action.quiz
      }
    case 'RESET_QUIZ':
      return {
        ...state,
        quiz: []
      }
    default:
      return state
  }
}