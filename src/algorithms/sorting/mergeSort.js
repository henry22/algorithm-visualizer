import { setArray } from '../../reducers/array'
import { setCurrentMerge } from '../../reducers/mergeSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'
import { setCurrentSorted } from '../../reducers/sorted'

function mergeSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []
  let finalArray = mergeSortHelper(array.map((num, index) => [num, index]), toDispatch, 0, array.length - 1, { array: array.slice(0) })
  handleDispatch(toDispatch, dispatch, finalArray, speed)
}

function mergeSortHelper(array, toDispatch, start, end, obj) {
  if (array.length === 1) return array

  let half = Math.floor(array.length / 2)
  let first = array.slice(0, half)
  let second = array.slice(half)
  let indexHalf = Math.floor((start + end + 1) / 2)
  let actualFirst = mergeSortHelper(first, toDispatch, start, indexHalf - 1, obj)
  let actualSecond = mergeSortHelper(second, toDispatch, indexHalf, end, obj)
  let isFinalMerge = false

  if (actualFirst.length + actualSecond.length === obj.array.length) {
    isFinalMerge = true
  }

  return actualSort(actualFirst, actualSecond, toDispatch, obj, start, end, isFinalMerge)
}

function actualSort(first, second, toDispatch, obj, start, end, isFinalMerge) {
  let sortedArray = []
  let indexToPush = start

  while (first.length && second.length) {
    toDispatch.push([first[0][1], second[0][1]])
    if (first[0][0] <= second[0][0]) {
      indexToPush++
      sortedArray.push(first.shift())
    } else {
      toDispatch.push([first[0][1], second[0][1], true])
      second[0][1] = indexToPush++
      sortedArray.push(second.shift())
      first.forEach(subArr => subArr[1]++)
      if (start === 0) {
        obj.array = sortedArray.map(subArr => subArr[0]).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1))
      } else {
        obj.array = obj.array.slice(0, start).concat(sortedArray.map(subArr => subArr[0])).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1))
      }
      toDispatch.push(obj.array.concat([indexToPush - 1, indexToPush]))
      toDispatch.push([])
    }
    if (isFinalMerge) {
      toDispatch.push([true, indexToPush - 1])
    }
  }

  return sortedArray.concat(first).concat(second)
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentMerge(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(setCurrentMerge([]))
      dispatch(setCurrentSorted(array.map((num, index) => index)))
      dispatch(setRunning(false))
      dispatch(setEnding(true))
    }, 1000)
    return
  }

  let dispatchFunction

  if (toDispatch[0].length > 3) {
    dispatchFunction = setArray
  } else if (toDispatch[0].length === 3 && typeof toDispatch[0][2] === 'boolean' || toDispatch[0].length === 0) {
    dispatchFunction = setCurrentSwapper
  } else if (toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean') {
    dispatchFunction = setCurrentSorted
  } else {
    dispatchFunction = setCurrentMerge
  }

  if (dispatchFunction === setArray) {
    let currentToDispatch = toDispatch.shift()
    dispatch(dispatchFunction(currentToDispatch.slice(0, currentToDispatch.length - 2)))
    dispatch(setCurrentSwapper([]))
    dispatch(setCurrentMerge([]))
    dispatch(setCurrentSwapper([currentToDispatch[currentToDispatch.length - 2], currentToDispatch[currentToDispatch.length - 1]]))
    dispatch(setCurrentMerge([currentToDispatch[currentToDispatch.length - 2], currentToDispatch[currentToDispatch.length - 1]]))
  } else {
    dispatch(dispatchFunction(toDispatch.shift()))
  }

  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default mergeSort