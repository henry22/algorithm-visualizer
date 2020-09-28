import { SET_ARRAY } from '../../actions'
const initialState = []

const array = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARRAY:
      return [...state]
    default:
      return state
  }
}

export default array