import React from 'react'
import './Navbar.css'
import { AppBar, Toolbar, FormControl, FormControlLabel, RadioGroup, Radio, Grid } from '@material-ui/core'
import logo from '../../logo.png'

const Navbar = (props) => {
  const { updateAlgorithm, isRunning } = props

  const handleClick = (algorithm) => {
    updateAlgorithm(algorithm)
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid item xs={2}>
          <img src={logo} alt="Logo" />
        </Grid>

        <Grid item xs={10}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="algorithm"
              name="algorithm"
            >
              <FormControlLabel value="BubbleSort" control={<Radio />} label="BubbleSort" onClick={() => handleClick("bubbleSort")} disabled={isRunning} />
              <FormControlLabel value="MergeSort" control={<Radio />} label="MergeSort" onClick={() => handleClick('mergeSort')} disabled={isRunning} />
              <FormControlLabel value="QuickSort" control={<Radio />} label="QuickSort" onClick={() => handleClick('quickSort')} disabled={isRunning} />
              <FormControlLabel value="InsertionSort" control={<Radio />} label="InsertionSort" onClick={() => handleClick('insertionSort')} disabled={isRunning} />
              {/* <FormControlLabel value="SelectionSort" control={<Radio />} label="SelectionSort" /> */}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar