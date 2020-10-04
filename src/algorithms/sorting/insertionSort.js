import { setArray } from '../../reducers/array'
import { setCurrentInsertionSort } from '../../reducers/insertionSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setCurrentSorted } from '../../reducers/sorted'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'

function insertionSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []

  for (let i = 1; i <= array.length; i++) {
    let j = i
    toDispatch.push([j - 1, j])
    while (j > 0 && array[j - 1] > array[j]) {
      toDispatch.push([j - 1, j])
      const temp = array[j]
      array[j] = array[j - 1]
      array[j - 1] = temp
      toDispatch.push([j - 1, j, true])
      j--;
      toDispatch.push(array.slice(0))
      toDispatch.push([])
    }
    toDispatch.push([true, i - 1])
  }

  handleDispatch(toDispatch, dispatch, array, speed)
  return array
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentInsertionSort(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(setCurrentInsertionSort([]))
      dispatch(setCurrentSorted(array.map((num, index) => index)))
      dispatch(setRunning(false))
      dispatch(setEnding(true))
    }, 1000)
    return
  }

  let dispatchFunction

  if (toDispatch[0].length > 3) {
    dispatchFunction = setArray
  } else if (toDispatch[0].length === 3 || toDispatch[0].length === 0) {
    dispatchFunction = setCurrentSwapper
  } else if (toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean') {
    dispatchFunction = setCurrentSorted
  } else {
    dispatchFunction = setCurrentInsertionSort
  }

  dispatch(dispatchFunction(toDispatch.shift()))

  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default insertionSort