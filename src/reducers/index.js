import { combineReducers } from 'redux'
import { array } from './array'
import { algorithm } from './algorithm'
import { currentSwapper } from './swapper'
import { currentBubbleSortTwo } from './bubbleSort'
import { currentSorted } from './sorted'
import { isRunning } from './running'
import { isEnding } from './isEnd'

const rootReducer = combineReducers({
  array,
  algorithm,
  currentSwapper,
  currentBubbleSortTwo,
  currentSorted,
  isRunning,
  isEnding
})

export default rootReducer