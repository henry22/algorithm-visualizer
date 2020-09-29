import { setArray } from '../../reducers/array'
import { setCurrentBubbleTwo } from '../../reducers/bubbleSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setCurrentSorted } from '../../reducers/sorted'
import { setRunning } from '../../reducers/running'

function bubbleSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []
  let sorted = false
  let round = 0

  while (!sorted) {
    sorted = true
    for (let i = 0; i < array.length - 1 - round; i++) {
      toDispatch.push([i, i + 1])
      if (array[i] > array[i + 1]) {
        toDispatch.push([i, i + 1, true])
        const temp = array[i]
        array[i] = array[i + 1]
        array[i + 1] = temp
        sorted = false
        toDispatch.push(array.slice(0))
        toDispatch.push([])
      }
    }
    toDispatch.push([true, array.length - 1 - round])
    round++
  }
  handleDispatch(toDispatch, dispatch, array, speed)
  return array
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentBubbleTwo(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(setCurrentBubbleTwo([]))
      dispatch(setCurrentSorted(array.map((num, index) => index)))
      dispatch(setRunning(false))
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
    dispatchFunction = setCurrentBubbleTwo
  }

  dispatch(dispatchFunction(toDispatch.shift()))

  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default bubbleSort