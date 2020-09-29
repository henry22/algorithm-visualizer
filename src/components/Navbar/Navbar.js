import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import { AppBar, Toolbar, FormControl, FormControlLabel, RadioGroup, Radio, Typography, Grid } from '@material-ui/core'

const Navbar = (props) => {
  const { array, algorithm, updateAlgorithm, generateArray, sort, isRunning } = props
  const speed = 570 - Math.pow(array.length, 2) > 0 ? 570 - Math.pow(array.length, 2) : 0
  const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white"
  const cursor = isRunning ? 'auto' : 'pointer'
  const changeSize = useRef(null)

  useEffect(() => {
    generateArray(5)
    // changeSize.current.value = 5
  }, [generateArray])

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
              <FormControlLabel value="BubbleSort" control={<Radio />} label="BubbleSort" onClick={() => handleClick("bubbleSort")} checked />
              {/* <FormControlLabel value="InsertionSort" control={<Radio />} label="InsertionSort" />
              <FormControlLabel value="SelectionSort" control={<Radio />} label="SelectionSort" />
              <FormControlLabel value="MergeSort" control={<Radio />} label="MergeSort" />
            <FormControlLabel value="QuickSort" control={<Radio />} label="QuickSort" /> */}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Toolbar>
    </AppBar>
    // <div id="toolbar">
    //   <div
    //     id={!isRunning ? "generateArray" : "generateArrayX"}
    //     style={{ color: color, cursor: cursor }}
    //     onClick={!isRunning ? () => generateArray(array.length) : null}>
    //     Generate New Array
    //   </div>
    //   <div className="separator"></div>
    //   <div
    //     id="arraySize"
    //     style={{ color: color }}>
    //     Change Array Size & Sorting Speed
    //   </div>
    //   <input
    //     ref={changeSize}
    //     type="range"
    //     min="0"
    //     max="100"
    //     style={{ background: color, cursor: cursor }}
    //     disabled={isRunning ? "disabled" : null}
    //     onChange={handleChange}
    //   />
    //   <div className="separator"></div>
    //   <div
    //     className={algorithm === "bubbleSort" ? "currentAlgorithmButton" : "algorithmButton"}
    //     onClick={() => handleClick("bubbleSort")}>
    //     Bubble Sort
    //   </div>
    //   <div className="separator"></div>
    //   { algorithm ? <div
    //     id="sort"
    //     style={{ color: color, cursor: cursor }}
    //     onClick={!isRunning ? () => sort(algorithm, array, speed) : null}>
    //     Sort!
    //     </div> : null
    //   }
    // </div>
  )
}

export default Navbar