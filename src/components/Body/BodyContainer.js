import { connect } from 'react-redux'
import Body from './Body'
import { setArray } from '../../reducers/array'
import { setAlgorithm } from '../../reducers/algorithm'
import { setCurrentSorted } from '../../reducers/sorted'
import { generateRandomArray } from '../../utility/Util'
import { setRunning } from '../../reducers/running'
import bubbleSort from '../../algorithms/sorting/bubbleSort'

const mapStateToProps = ({ array, currentBubbleSortTwo, currentSwapper, currentSorted, isRunning, isEnding, algorithm }) => ({ array, currentBubbleSortTwo, currentSwapper, currentSorted, isRunning, isEnding, algorithm })

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
    }

    dispatch(setCurrentSorted([]))
    dispatch(setRunning(true))
    doSort(array, dispatch, speed)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Body)