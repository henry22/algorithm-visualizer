const initialState = []
const SET_ARRAY = 'SET_ARRAY'

const array = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARRAY:
      return [...state]
    default:
      return state
  }
}

export default array