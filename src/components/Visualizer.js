import React from 'react';
import { mergeSortAnimation } from '../utility/Sorting';
import './Visualizer.css';
import Navbar from './Navbar'

const ANIMATION_SPEED_MS = 10;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: []
		};

		this.resetArray = this.resetArray.bind(this);
		this.mergeSort = this.mergeSort.bind(this);
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
			array.push(this.randomIntFromInterval(5, 500));
		}
		this.setState({ array });
	}

	randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	mergeSort() {
		const animations = mergeSortAnimation(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [ barOneIdx, barTwoIdx ] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					const [ barOneIdx, newHeight ] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	render() {
		const { array } = this.state;
		return (
			<div className="main">
				<Navbar resetArray={this.resetArray} mergeSort={this.mergeSort} />

				<div className="array-container">
					{array.map((val, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor: PRIMARY_COLOR,
								height: `${val}px`
							}}
						/>
					))}
				</div>
			</div>
		);
	}
}
