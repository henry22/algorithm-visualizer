import React, { useState, useRef, useEffect, useCallback } from 'react'
import Chart from '../Chart/Chart'
import Footer from '../Footer/Footer'
import SortInfo from '../SortInfo/SortInfo'
import { Container, Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button, Collapse, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close'
import { debounce } from 'lodash'

const Body = (props) => {
  const [inputType, setInputType] = useState('DefaultInput');
  const [speed, setSpeed] = useState(1000);
  const [customNumbers, setCustomNumbers] = useState([]);
  const [open, setOpen] = React.useState({
    isOpen: false,
    text: ''
  })
  const minItems = 4;
  const maxItems = 30;
  const { array, currentBubbleSortTwo, currentMergeSort, currentQuickSort, pivot, currentSwapper, currentSorted, generateArray, generateCustomArray, isRunning, isEnding, sort, algorithm, close, stopRunning, startRunning } = props
  const customRef = useRef(null)

  const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "gray"
  const cursor = isRunning ? 'auto' : 'pointer'

  useEffect(() => {
    generateArray(5)
  }, [generateArray])

  const delayHandleChange = useCallback(debounce((newValue) => {
    generateArray(newValue)
  }, 50), [])

  const handleChange = (e) => {
    delayHandleChange(e.target.value)
  }

  const changeSpeed = (e) => {
    const newSpeed = e.target.value;
    if (newSpeed < 0 || newSpeed > 1000) {
      setOpen({
        ...open,
        isOpen: true,
        text: 'Speed should be between 0 and 1000 ms!'
      })
    } else {
      setSpeed(newSpeed);
    }
  }

  const customInput = (e) => {
    let input = e.target.value

    if (input === '') {
      startRunning()
      setCustomNumbers([])
    }

    const customInput = input.trim().split(' ').map((value) => {
      const number = parseInt(value, 10)
      if (isNaN(number)) {
        setOpen({
          ...open,
          isOpen: true,
          text: 'Input should be a number'
        })
        stopRunning()
      }
      return number
    })

    if (customInput.length < 4) {
      setOpen({
        ...open,
        isOpen: true,
        text: 'Input should have at least 4 numbers'
      })
      stopRunning()
    } else {
      startRunning()
    }

    setCustomNumbers(customInput);
  }

  const submit = () => {
    const customItems = []
    for (let i = 0; i < customNumbers.length; i++) {
      customItems.push(customNumbers[i]);
    }
    generateCustomArray(customItems)
  }

  const changeHandler = (e) => {
    switch (e.target.value) {
      case 'DefaultInput':
        setInputType('DefaultInput')
        generateArray(5)
        startRunning()
        break
      default:
        setInputType(e.target.value)
        break
    }
  }

  const handleClose = () => {
    close()
  }

  const setAlert = () => {
    setOpen({
      ...open,
      isOpen: true,
      text: 'please select one algorithm'
    })
  }

  return (
    <>
      <Collapse in={open.isOpen} style={{ position: 'absolute', top: '64px', width: '100%' }}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen({
                  ...open,
                  isOpen: false
                });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {open.text}
        </Alert>
      </Collapse>
      <Container maxWidth="lg" style={{ height: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', marginTop: '64px' }}>
        <Grid container justify="center">
          {inputType === 'DefaultInput' && (
            <Grid item xs={12}>
              <Typography component="h4" variant="h4">
                Number of items: {array.length}
              </Typography>
            </Grid>
          )}

          {inputType === 'DefaultInput' && (
            <Grid item xs={12}>
              <span
                style={{ color: color }}>
                Change items size
              </span>
              <input
                type="range"
                min={minItems}
                max={maxItems}
                step="1"
                style={{ background: color, cursor: cursor }}
                disabled={isRunning ? "disabled" : null}
                onChange={handleChange}
                value={array.length}
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
                onChange={changeHandler}
              >
                <FormControlLabel value="CustomInput" control={<Radio />} label="Custom Input" disabled={isRunning} />
                <FormControlLabel value="DefaultInput" control={<Radio />} label="Default Input" disabled={isRunning} />
              </RadioGroup>
            </FormControl>
          </Grid>
          {inputType === 'CustomInput' && (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item xs={6}>
                <TextField
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

          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item xs={2}>
              <Button color="secondary" variant="contained" onClick={!isRunning ? () => generateArray(array.length) : null} disabled={isRunning}>
                Regenerate
              </Button>
            </Grid>

            <Grid item xs={2}>
              <Button
                disabled={isRunning}
                variant="contained"
                color="primary"
                onClick={algorithm ? () => sort(algorithm, array, speed) : setAlert}
              >
                Sort!
              </Button>
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Speed (ms)"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                value={speed}
                onChange={changeSpeed}
                disabled={isRunning}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ position: 'relative', height: '50vh' }}>
            <Chart array={array} currentSwapper={currentSwapper} currentBubbleSortTwo={currentBubbleSortTwo} currentMergeSort={currentMergeSort} currentSorted={currentSorted} currentQuickSort={currentQuickSort} pivot={pivot} />
          </Grid>

          <Footer />
        </Grid>

        <SortInfo isEnding={isEnding} handleClose={handleClose} algorithm={algorithm} />
      </Container>
    </>
  )
}

export default Body