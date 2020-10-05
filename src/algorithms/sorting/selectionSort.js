import { setArray } from '../../reducers/array'
import { setCurrentSelectionSort } from '../../reducers/selectionSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setCurrentSorted } from '../../reducers/sorted'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'

function selectionSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []

  for (let i = 0; i < array.length; i++) {
    let minIndex = i

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }

      toDispatch.push([i, j])
    }

    if (minIndex !== i) {
      toDispatch.push([minIndex, i, true])

      const temp = array[i]
      array[i] = array[minIndex]
      array[minIndex] = temp

      toDispatch.push(array.slice(0))
      toDispatch.push([])
      toDispatch.push([true, i])
    } else {
      toDispatch.push([true, i])
    }
  }

  handleDispatch(toDispatch, dispatch, array, speed)
  return array
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentSelectionSort(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(setCurrentSelectionSort([]))
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
    dispatchFunction = setCurrentSelectionSort
  }

  dispatch(dispatchFunction(toDispatch.shift()))

  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default selectionSort