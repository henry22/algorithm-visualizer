import { connect } from 'react-redux'
import Navbar from './Navbar'
import { setArray } from '../../reducers/array'
import { setAlgorithm } from '../../reducers/algorithm'
import { setCurrentSorted } from '../../reducers/sorted'
import { setRunning } from '../../reducers/running'
import bubbleSort from '../../algorithms/sorting/bubbleSort'
import { generateRandomArray } from '../../utility/Util'

const mapStateToProps = ({ array, algorithm, isRunning }) => ({ array, algorithm, isRunning })
const mapDispatchToProps = () => dispatch => ({
  generateArray: length => {
    const array = generateRandomArray(length)
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)