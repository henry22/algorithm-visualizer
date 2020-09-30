import { setArray } from '../../reducers/array'
import { setCurrentQuickSort, setPivot } from '../../reducers/quickSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setCurrentSorted } from '../../reducers/sorted'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'

function quickSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []

  quickSortHelper(array, 0, array.length - 1, toDispatch)
  handleDispatch(toDispatch, dispatch, array, speed)
  return array
}

function quickSortHelper(array, start, end, toDispatch) {
  if (start >= end) {
    toDispatch.push([true, start])
    return
  }

  let pivot = start
  let left = start + 1
  let right = end

  toDispatch.push(pivot)
  toDispatch.push([left, right])

  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      toDispatch.push([left, right, true])
      const temp = array[right]
      array[right] = array[left]
      array[left] = temp
      toDispatch.push(array.slice(0))
      toDispatch.push([])
    }
    if (array[right] >= array[pivot]) {
      right--
    }
    if (array[left] <= array[pivot]) {
      left++
    }
    if (right >= left) {
      toDispatch.push([left, right])
    }
  }
  toDispatch.push([pivot, right])
  if (pivot !== right) {
    const temp = array[right]
    array[right] = array[pivot]
    array[pivot] = temp
    toDispatch.push([pivot, right, true])
    toDispatch.push(array.slice(0))
    toDispatch.push([])
    toDispatch.push([true, right])
  }
  quickSortHelper(array, start, right - 1, toDispatch)
  quickSortHelper(array, right + 1, end, toDispatch)
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setPivot(null))
    dispatch(setCurrentQuickSort(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(setCurrentQuickSort([]))
      dispatch(setRunning(false))
      dispatch(setEnding(true))
    }, 1000)
    return
  }

  let dispatchFunction

  if (!(toDispatch[0] instanceof Array)) {
    dispatchFunction = setPivot
  } else if (toDispatch[0].length > 3) {
    dispatchFunction = setArray
  } else if (toDispatch[0].length !== 2) {
    dispatchFunction = setCurrentSwapper
  } else if (toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean') {
    dispatchFunction = setCurrentSorted
  } else {
    dispatchFunction = setCurrentQuickSort
  }

  dispatch(dispatchFunction(toDispatch.shift()))
  if (dispatchFunction === setPivot) {
    dispatch(setCurrentQuickSort(toDispatch.shift()))
  }
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default quickSort