import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Slider, Snackbar } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { generateRandomArray } from '../utility/Util';
import Body from './Body';
import { getAlgoFunction } from '../utility/Sorting';
import { uid } from 'react-uid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function Visualizer() {
	const [ speed, setSpeed ] = useState(1000);
	const [ numItems, setNumItems ] = useState(2);
	const [ isSorted, setIsSorted ] = useState(false);
	const [ algoFunction, setAlgoFunction ] = useState('BubbleSort');
	const [ inputType, setInputType ] = useState('DefaultInput');
	const [ process, setProcess ] = useState(false);
	const [ items, setItems ] = useState(generateRandomArray(numItems));
	const [ customNumbers, setCustomNumbers ] = useState([]);
	const maxItems = 30;

	function changeSpeed(e) {
		const newSpeed = e.target.value;
		if (newSpeed < 0 || newSpeed > 1000) {
			alert('Speed should be between 0 and 1000 ms');
		} else {
			setSpeed(newSpeed);
		}
	}

	function customInput(e) {
		let input = e.target.value.split(' ').filter((number) => parseInt(number));
		setCustomNumbers(input);
	}

	function submit() {
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

	function reset(num) {
		setProcess(false);
		setAlgoFunction('BubbleSort');
		setIsSorted(false);
		setNewItems(num);
	}

	function resetNumbers() {
		setProcess(false);
		setIsSorted(false);
		setAlgoFunction(algoFunction);
		let randomItems = generateRandomArray(numItems);
		setItems(randomItems);
	}

	function setNewItems(num) {
		if (num === numItems) {
			return;
		}

		setNumItems(num);
		let randomItems = generateRandomArray(num);
		setItems(randomItems);
	}

	function checkSwappedElements(itemsPrev, itemsCurrent) {
		let newItems = [];
		for (let i = 0; i < items.length; i++) {
			newItems[i] = itemsCurrent[i];
			console.log(itemsCurrent[i], itemsPrev[i]);
			if (itemsCurrent[i].itemValue !== itemsPrev[i].itemValue) {
				newItems[i].IsBeingSwapped = true;
			}
		}
		return newItems;
	}

	function runAlgorithm() {
		const result = getAlgoFunction(algoFunction)(items);

		for (let i = 0; i < result.length; i++) {
			console.log('result', result[i]);
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

	function handleClose(reason) {
		if (reason === 'clickaway') {
			return;
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">Logo</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" style={{ height: '100vh' }}>
				<Grid container spacing={3}>
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
								value={typeof numItems === 'number' ? numItems : 0}
								onChange={(e, newValue) => reset(newValue)}
								aria-labelledby="input-slider"
								valueLabelDisplay="auto"
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
						<Grid item xs={12}>
							<TextField
								id="custom_input"
								onChange={customInput}
								type="text"
								placeholder="Insert space separated numbers. Eg: 23 7 12 90"
								style={{ width: '100%' }}
							/>
							<Button disabled={process} variant="contained" color="primary" onClick={() => submit()}>
								Done!
							</Button>
						</Grid>
					)}
					<Grid item xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Sorting Algorithm</FormLabel>
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
								<FormControlLabel value="MergeSort" control={<Radio />} label="MergeSort" />
								<FormControlLabel value="QuickSort" control={<Radio />} label="QuickSort" />
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button disabled={process} variant="contained" color="primary" onClick={() => runAlgorithm()}>
							Sort!
						</Button>
						<Button color="secondary" variant="contained" onClick={resetNumbers}>
							RESET
						</Button>

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
					action={
						<React.Fragment>
							<Button color="secondary" size="small" onClick={resetNumbers}>
								RESET
							</Button>
						</React.Fragment>
					}
				/>
			</Container>
		</React.Fragment>
	);
}
