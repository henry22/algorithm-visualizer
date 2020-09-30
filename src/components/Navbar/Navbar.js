import React, { useState } from 'react'
import './Navbar.css'
import { AppBar, Toolbar, FormControl, FormControlLabel, RadioGroup, Radio, Typography, Grid } from '@material-ui/core'

const Navbar = (props) => {
  const { array, algorithm, updateAlgorithm, generateArray, sort, isRunning } = props

  const handleClick = (algorithm) => {
    updateAlgorithm(algorithm)
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">Logo</Typography>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="algorithm"
              name="algorithm"
            >
              <FormControlLabel value="BubbleSort" control={<Radio />} label="BubbleSort" onClick={() => handleClick("bubbleSort")} checked={algorithm === 'bubbleSort'} />
              {/* <FormControlLabel value="InsertionSort" control={<Radio />} label="InsertionSort" />
              <FormControlLabel value="SelectionSort" control={<Radio />} label="SelectionSort" />
              <FormControlLabel value="MergeSort" control={<Radio />} label="MergeSort" />
            <FormControlLabel value="QuickSort" control={<Radio />} label="QuickSort" /> */}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar