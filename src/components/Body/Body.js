import React, { useState, useRef, useEffect } from 'react'
import Chart from '../Chart/Chart'
import { Container, Grid, Slider, Snackbar, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@material-ui/core'
import './Body.css'

const Body = (props) => {
  const [inputType, setInputType] = useState('DefaultInput');
  const [speed, setSpeed] = useState(1000);
  const [customNumbers, setCustomNumbers] = useState([]);
  const minItems = 2;
  const maxItems = 30;
  const { array, currentBubbleSortTwo, currentSwapper, currentSorted, generateArray, generateCustomArray, isRunning, isEnding, sort, algorithm } = props
  const customRef = useRef(null)

  const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "gray"
  const cursor = isRunning ? 'auto' : 'pointer'

  useEffect(() => {
    generateArray(5)
  }, [])

  const handleChange = (e) => {
    generateArray(e.target.value);
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
    generateCustomArray(customItems)
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
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
            <div
              id="arraySize"
              style={{ color: color }}>
              Change Array Size
            </div>
            <input
              id="changeSize"
              type="range"
              min={minItems}
              max={maxItems}
              step="1"
              style={{ background: color, cursor: cursor }}
              disabled={isRunning ? "disabled" : null}
              onChange={handleChange}
              value={array.length}
            />
            {/* <Slider
              defaultValue={5}
              value={array.length}
              onChange={(e, newNum) => handleChange(newNum)}
              aria-labelledby="input-slider"
              valueLabelDisplay="auto"
              min={minItems}
              max={maxItems}
            /> */}
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
            <Button color="secondary" variant="contained" onClick={!isRunning ? () => generateArray(array.length) : null} disabled={isRunning}>
              RESET
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              disabled={isRunning}
              variant="contained"
              color="primary"
              onClick={!isRunning ? () => sort(algorithm, array, speed) : null}
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
        open={isEnding}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Sorting completed!"
      />
    </Container>
  )
}

export default Body