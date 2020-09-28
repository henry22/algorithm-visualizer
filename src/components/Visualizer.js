import React, { useState } from 'react';
import { Grid, CssBaseline, Typography, Container, Slider, Snackbar, Radio, RadioGroup, FormControlLabel, FormControl, Button, TextField, AppBar, Toolbar } from '@material-ui/core';

import Body from './Body';
import { uid } from 'react-uid';
import { generateRandomArray } from '../utility/Util';
import { getAlgoFunction } from '../utility/Sorting';

const Visualizer = () => {
  const [speed, setSpeed] = useState(1000);
  const [numItems, setNumItems] = useState(5);
  const [isSorted, setIsSorted] = useState(false);
  const [algoFunction, setAlgoFunction] = useState('BubbleSort');
  const [inputType, setInputType] = useState('DefaultInput');
  const [process, setProcess] = useState(false);
  const [items, setItems] = useState(generateRandomArray(numItems));
  const [customNumbers, setCustomNumbers] = useState([]);
  const minItems = 2;
  const maxItems = 30;

  const changeSpeed = (e) => {
    const newSpeed = e.target.value;
    if (newSpeed < 0 || newSpeed > 1000) {
      alert('Speed should be between 0 and 1000 ms');
    } else {
      setSpeed(newSpeed);
    }
  }

  const customInput = (e) => {
    let input = e.target.value.split(' ').filter((number) => parseInt(number));
    setCustomNumbers(input);
  }

  const submit = () => {
    setItems([]);
    let customItems = [];
    for (let i = 0; i < customNumbers.length; i++) {
      const value = customNumbers[i];
      customItems.push({
        id: uid(Math.random()),
        itemValue: Number(value),
        color: '#2d8ae2',
        IsBeingSwapped: false
      });
    }
    setItems(customItems);
  }

  const reset = (num) => {
    setProcess(false);
    setAlgoFunction('BubbleSort');
    setIsSorted(false);
    setNewItems(num);
  }

  const resetNumbers = () => {
    setProcess(false);
    setIsSorted(false);
    setAlgoFunction(algoFunction);
    let randomItems = generateRandomArray(numItems);
    setItems(randomItems);
  }

  const setNewItems = (num) => {
    if (num === numItems) {
      return;
    }

    setNumItems(num);
    let randomItems = generateRandomArray(num);
    setItems(randomItems);
  }

  const checkSwappedElements = (itemsPrev, itemsCurrent) => {
    let newItems = [];
    // console.log(items, itemsPrev, itemsCurrent)
    for (let i = 0; i < items.length; i++) {
      // console.log(itemsPrev[i], itemsCurrent[i])
      newItems[i] = itemsCurrent[i];

      if (itemsCurrent[i].itemValue !== itemsPrev[i].itemValue) {
        newItems[i].IsBeingSwapped = true;
      }
    }
    return newItems;
  }

  const runAlgorithm = () => {
    const result = getAlgoFunction(algoFunction)(items);

    for (let i = 0; i < result.length; i++) {
      if (i !== result.length - 1) {
        let resultItemsWithSwapState =
          i === 0 ? checkSwappedElements(items, result[i]) : checkSwappedElements(result[i - 1], result[i]);
        setTimeout(() => {
          setItems(resultItemsWithSwapState);
        }, i * speed);
      } else {
        setTimeout(() => {
          setItems(result[i]);
        }, i * speed);
      }

      setTimeout(() => {
        setIsSorted(true);
      }, result.length * speed);
    }
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Logo</Typography>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="algorithm"
                name="algorithm"
                value={algoFunction}
                onChange={(e) => setAlgoFunction(e.target.value)}
              >
                <FormControlLabel value="BubbleSort" control={<Radio />} label="BubbleSort" />
                <FormControlLabel value="InsertionSort" control={<Radio />} label="InsertionSort" />
                <FormControlLabel value="SelectionSort" control={<Radio />} label="SelectionSort" />
                {/* <FormControlLabel value="MergeSort" control={<Radio />} label="MergeSort" />
              <FormControlLabel value="QuickSort" control={<Radio />} label="QuickSort" /> */}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Grid container style={{
          maxHeight: '500px'
        }}>
          {inputType === 'DefaultInput' && (
            <Grid item xs={12}>
              <Typography component="h4" variant="h4">
                Number of items: {numItems}
              </Typography>
            </Grid>
          )}

          {inputType === 'DefaultInput' && (
            <Grid item xs={12}>
              <Slider
                value={typeof numItems === 'number' ? numItems : 2}
                onChange={(e, newValue) => reset(newValue)}
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
                  onChange={customInput}
                  type="text"
                  placeholder="Insert space separated numbers. ex: 23 7 12 90"
                  style={{ width: '100%', marginBottom: '20px' }}
                />
              </Grid>

              <Grid item xs={2}>
                <Button disabled={process} variant="contained" color="primary" onClick={() => submit()}>
                  Done!
								</Button>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={4}>
              <Button color="secondary" variant="contained" onClick={resetNumbers}>
                RESET
							</Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                disabled={process}
                variant="contained"
                color="primary"
                onClick={() => runAlgorithm()}
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
            <Body items={items} />
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={isSorted}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Sorting completed!"
        />
      </Container>
    </React.Fragment>
  );
}

export default Visualizer