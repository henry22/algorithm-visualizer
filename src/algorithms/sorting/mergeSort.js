import { setArray } from '../../reducers/array'
import { setCurrentMerge } from '../../reducers/mergeSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'
import { FitnessCenter } from '@material-ui/icons'

function mergeSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []
  let finalArray = mergeSortHelper(array.map((num, index) => [num, index]), toDispatch, 0, array.length - 1, { array: array.slice(0) })
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

  return actualSort(first, second, toDispatch, obj, start, end, isFinalMerge)
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
    }
  }
}