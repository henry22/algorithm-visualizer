import { connect } from 'react-redux'
import Body from './Body'
import { setArray } from '../../reducers/array'
import { setAlgorithm } from '../../reducers/algorithm'
import { setCurrentSorted } from '../../reducers/sorted'
import { generateRandomArray } from '../../utility/Util'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'
import bubbleSort from '../../algorithms/sorting/bubbleSort'
import mergeSort from '../../algorithms/sorting/mergeSort'
import quickSort from '../../algorithms/sorting/quickSort'
import insertionSort from '../../algorithms/sorting/insertionSort'

const mapStateToProps = ({ array, currentBubbleSortTwo, currentMergeSort, currentQuickSort, pivot, currentSwapper, currentSorted, isRunning, isEnding, algorithm, currentInsertionSort }) => ({ array, currentBubbleSortTwo, currentMergeSort, currentQuickSort, pivot, currentSwapper, currentSorted, isRunning, isEnding, algorithm, currentInsertionSort })

const mapDispatchToProps = () => dispatch => ({
  generateArray: length => {
    const array = generateRandomArray(length)
    dispatch(setArray(array))
    dispatch(setCurrentSorted([]))
  },
  generateCustomArray: array => {
    dispatch(setArray(array))
    dispatch(setCurrentSorted([]))
  },
  updateAlgorithm: algorithm => {
    dispatch(setAlgorithm(algorithm))
  },
  sort: (algorithm, array, speed) => {
    let doSort
    if (algorithm === 'bubbleSort') {
      doSort = bubbleSort
    } else if (algorithm === 'mergeSort') {
      doSort = mergeSort
    } else if (algorithm === 'quickSort') {
      doSort = quickSort
    } else if (algorithm === 'insertionSort') {
      doSort = insertionSort
    } else {
      return
    }

    dispatch(setCurrentSorted([]))
    dispatch(setRunning(true))
    doSort(array, dispatch, speed)
  },
  close: () => {
    dispatch(setEnding(false))
  },
  startRunning: () => {
    dispatch(setRunning(false))
  },
  stopRunning: () => {
    dispatch(setRunning(true))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Body)