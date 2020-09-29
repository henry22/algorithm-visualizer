import { combineReducers } from 'redux'
import { array } from './array'
import { algorithm } from './algorithm'
import { currentSwapper } from './swapper'
import { currentBubbleSortTwo } from './bubbleSort'
import { currentSorted } from './sorted'

const rootReducer = combineReducers({
  array,
  algorithm,
  currentSwapper,
  currentBubbleSortTwo,
  currentSorted
})

export default rootReducer