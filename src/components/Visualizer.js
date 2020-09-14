import React from 'react';
import '../Visualizer.css';

const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR = 'turquoise';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: []
		};
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

	render() {
		const { array } = this.state;
		return (
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
				<div className="container">
					<button>Generate New</button>
					<button>Merge Sort</button>
				</div>
			</div>
		);
	}
}
