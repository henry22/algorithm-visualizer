import { setArray } from '../../reducers/array'
import { setCurrentInsertionSort } from '../../reducers/insertionSort'
import { setCurrentSwapper } from '../../reducers/swapper'
import { setCurrentSorted } from '../../reducers/sorted'
import { setRunning } from '../../reducers/running'
import { setEnding } from '../../reducers/isEnd'

function insertionSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0)
  let toDispatch = []

  for (let i = 1; i < array.length; i++) {
    let key = array[i]
    let j = i - 1
    while (key < array[j] && j >= 0) {
      toDispatch.push([j, j + 1])
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = key
  }

}