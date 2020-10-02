import { connect } from 'react-redux'
import Navbar from './Navbar'
import { setAlgorithm } from '../../reducers/algorithm'

const mapStateToProps = ({ isRunning }) => ({ isRunning })
const mapDispatchToProps = () => dispatch => ({
  updateAlgorithm: algorithm => {
    dispatch(setAlgorithm(algorithm))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)