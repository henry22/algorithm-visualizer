import { combineReducers } from 'redux'
import { array } from './array'
import { algorithm } from './algorithm'
import { currentSwapper } from './swapper'
import { currentSorted } from './sorted'
import { isRunning } from './running'
import { isEnding } from './isEnd'
import { currentBubbleSortTwo } from './bubbleSort'
import { currentMergeSort } from './mergeSort'

const rootReducer = combineReducers({
  array,
  algorithm,
  currentSwapper,
  currentSorted,
  isRunning,
  isEnding,
  currentBubbleSortTwo,
  currentMergeSort
})

export default rootReducer