import { combineReducers } from 'redux'
import { array } from './array'
import { algorithm } from './algorithm'
import { currentSwapper } from './swapper'
import { currentSorted } from './sorted'
import { isRunning } from './running'
import { isEnding } from './isEnd'
import { currentBubbleSortTwo } from './bubbleSort'
import { currentMergeSort } from './mergeSort'
import { currentQuickSort, pivot } from './quickSort'
import { currentInsertionSort } from './insertionSort'
import { currentHeapSort } from './heapSort'
import { currentSelectionSort } from './selectionSort'

const rootReducer = combineReducers({
  array,
  algorithm,
  currentSwapper,
  currentSorted,
  isRunning,
  isEnding,
  currentBubbleSortTwo,
  currentMergeSort,
  currentQuickSort,
  pivot,
  currentInsertionSort,
  currentHeapSort,
  currentSelectionSort
})

export default rootReducer