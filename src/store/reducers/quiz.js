const initialState = {
  quizes: [],
  error: null
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
    default: 
      return state
  }

}