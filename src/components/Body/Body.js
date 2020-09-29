import React, { useState, useRef } from 'react'
import Chart from '../Chart/Chart'
import { Container, Grid, Slider, Snackbar, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@material-ui/core'
import './Body.css'

const Body = (props) => {
  const [inputType, setInputType] = useState('DefaultInput');
  const [speed, setSpeed] = useState(1000);
  const [customNumbers, setCustomNumbers] = useState([]);
  const minItems = 2;
  const maxItems = 30;
  const { array, currentBubbleSortTwo, currentSwapper, currentSorted, updateAlgorithm, generateArray, isRunning } = props
  const customRef = useRef(null)

  // const numWidth = array.length * 10
  // const width = `${numWidth}px`
  // const numMargin = 10
  // const margin = `${numMargin}px`
  // const color = numWidth > 0 ? 'white' : 'transparent'
  // const numFont = 20
  // const fontSize = `${numFont}px`

  const handleChange = (newNum) => {
    console.log('new num', newNum)
    generateArray(newNum);
  }

  const changeSpeed = (e) => {
    const newSpeed = e.target.value;
    if (newSpeed < 0 || newSpeed > 1000) {
      alert('Speed should be between 0 and 1000 ms');
    } else {
      setSpeed(newSpeed);
    }
  }

  const customInput = (e) => {
    let input = e.target.value.split(' ').map((number) => parseInt(number, 10));
    setCustomNumbers(input);
  }

  const submit = () => {
    const customItems = []
    for (let i = 0; i < customNumbers.length; i++) {
      customItems.push(customNumbers[i]);
    }
    console.log('custom items', customItems)
    generateArray(customItems)
  }

  return (
    <Container maxWidth="lg" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container style={{
        maxHeight: '500px'
      }}>
        {inputType === 'DefaultInput' && (
          <Grid item xs={12}>
            <Typography component="h4" variant="h4">
              Number of items: {array.length}
            </Typography>
          </Grid>
        )}

        {inputType === 'DefaultInput' && (
          <Grid item xs={12}>
            <Slider
              value={array.length}
              onChange={(e, newValue) => handleChange(newValue)}
              aria-labelledby="input-slider"
              valueLabelDisplay="auto"
              min={minItems}
              max={maxItems}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="input-type"
              name="input-type"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <FormControlLabel value="CustomInput" control={<Radio />} label="Custom Input" />
              <FormControlLabel value="DefaultInput" control={<Radio />} label="Default Input" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {inputType === 'CustomInput' && (
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={10}>
              <TextField
                id="custom_input"
                type="text"
                placeholder="Insert space separated numbers. ex: 23 7 12 90"
                style={{ width: '100%', marginBottom: '20px' }}
                ref={customRef}
                onChange={customInput}
              />
            </Grid>

            <Grid item xs={2}>
              <Button disabled={isRunning} variant="contained" color="primary" onClick={() => submit()}>
                Done!
              </Button>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={4}>
            {/* <Button color="secondary" variant="contained" onClick={resetNumbers}>
              RESET
            </Button> */}
          </Grid>

          <Grid item xs={4}>
            <Button
              disabled={isRunning}
              variant="contained"
              color="primary"
            // onClick={() => runAlgorithm()}
            >
              Sort!
            </Button>
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="standard-number"
              label="Speed (ms)"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              value={speed}
              onChange={changeSpeed}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Chart array={array} currentSwapper={currentSwapper} currentBubbleSortTwo={currentBubbleSortTwo} currentSorted={currentSorted} />
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        // open={isSorted}
        autoHideDuration={3000}
        // onClose={handleClose}
        message="Sorting completed!"
      />
    </Container>
    // <div id="bodyContainer">
    //   { array.length ? array.map((number, index) => {
    //     let backgroundColor;
    //     if (currentSwapper.includes(index)) {
    //       backgroundColor = "rgba(219, 57, 57, 0.8)"
    //     } else if (currentBubbleSortTwo.includes(index)) {
    //       backgroundColor = "rgba(78, 216, 96, 0.8)"
    //     } else if (currentSorted.includes(index)) {
    //       backgroundColor = "rgba(169, 92, 232, 0.8)"
    //     } else {
    //       backgroundColor = "rgba(66, 134, 244, 0.8)"
    //     }
    //     return <div
    //       className="arrayElement"
    //       key={index}
    //       style={{ height: `${number * 3}px`, width: width, marginLeft: margin, marginRigh: margin, backgroundColor: backgroundColor, color: color, fontSize: fontSize }}>
    //       {number}
    //     </div>
    //   }) : null}
    // </div>
  )
}

export default Body