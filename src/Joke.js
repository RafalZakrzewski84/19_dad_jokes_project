/** @format */

import React, { Component } from 'react';
import './Joke.css';

export default class Joke extends Component {
	constructor(props) {
		super(props);

		this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
		this.handleDecreaseScore = this.handleDecreaseScore.bind(this);
	}

	handleIncreaseScore() {
		this.props.onIncreaseScore(this.props.joke.id);
	}

	handleDecreaseScore() {
		this.props.onDecreaseScore(this.props.joke.id);
	}

	render() {
		const { joke } = this.props;
		return (
			<div className="Joke">
				<div className="Joke-btns">
					<i
						class="fa-solid fa-circle-arrow-up"
						onClick={this.handleIncreaseScore}></i>
					<span>{joke.score}</span>
					<i
						class="fa-solid fa-circle-arrow-down"
						onClick={this.handleDecreaseScore}></i>
				</div>
				<div className="Joke-text">{joke.joke}</div>
			</div>
		);
	}
}
