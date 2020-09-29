import { combineReducers } from 'redux'
import { array } from './array'
import { algorithm } from './algorithm'
import { currentBubbleSortTwo } from './bubbleSort'
import { currentSwapper } from './swapper'

const rootReducer = combineReducers({
  array,
  algorithm,
  currentBubbleSortTwo,
  currentSwapper
})

export default rootReducer