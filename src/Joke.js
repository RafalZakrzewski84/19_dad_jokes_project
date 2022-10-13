/** @format */

import React, { Component } from 'react';
import './Joke.css';

export default class Joke extends Component {
	render() {
		const { joke } = this.props;
		return (
			<div className="Joke">
				<div className="Joke-btns">
					<i
						class="fa-solid fa-circle-arrow-up"
						onClick={this.props.onIncreaseScore}></i>
					<span>{joke.score}</span>
					<i
						class="fa-solid fa-circle-arrow-down"
						onClick={this.props.onDecreaseScore}></i>
				</div>
				<div className="Joke-text">{joke.joke}</div>
			</div>
		);
	}
}
