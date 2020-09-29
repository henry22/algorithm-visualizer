import { combineReducers } from 'redux'
import { array } from './array'
import { algorithm } from './algorithm'
import { currentBubbleTwo } from './bubbleSort'

const rootReducer = combineReducers({
  array,
  algorithm,
  currentBubbleTwo
})

export default rootReducer