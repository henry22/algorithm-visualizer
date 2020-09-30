import { connect } from 'react-redux'
import Navbar from './Navbar'
import { setArray } from '../../reducers/array'
import { setAlgorithm } from '../../reducers/algorithm'
import { setCurrentSorted } from '../../reducers/sorted'
import { generateRandomArray } from '../../utility/Util'

const mapStateToProps = ({ algorithm }) => ({ algorithm })
const mapDispatchToProps = () => dispatch => ({
  generateArray: length => {
    const array = generateRandomArray(length)
    dispatch(setArray(array))
    dispatch(setCurrentSorted([]))
  },
  updateAlgorithm: algorithm => {
    dispatch(setAlgorithm(algorithm))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)