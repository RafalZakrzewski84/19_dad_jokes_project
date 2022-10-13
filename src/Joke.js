/** @format */

import React, { Component } from 'react';
import './Joke.css';

const borderColors = [
	'#4caf50',
	'#8bc34a',
	'#cddc39',
	'#ffeb3b',
	'#ffc107',
	'ff9800',
	'#f44336',
];
const emojiIcon = [
	'em em-rolling_on_the_floor_laughing',
	'em em-laughing',
	'em em-smiley',
	'em em-slightly_smiling_face',
	'em em-neutral_face',
	'em em-confused',
	'em em-angry',
];

export default class Joke extends Component {
	render() {
		const { joke } = this.props;
		const dynamic = {};
		if (joke.score >= 20) {
			dynamic.color = borderColors[0];
			dynamic.emoji = emojiIcon[0];
		} else if (joke.score >= 15) {
			dynamic.color = borderColors[1];
			dynamic.emoji = emojiIcon[1];
		} else if (joke.score >= 10) {
			dynamic.color = borderColors[2];
			dynamic.emoji = emojiIcon[2];
		} else if (joke.score >= 5) {
			dynamic.color = borderColors[3];
			dynamic.emoji = emojiIcon[3];
		} else if (joke.score >= 2) {
			dynamic.color = borderColors[4];
			dynamic.emoji = emojiIcon[4];
		} else if (joke.score >= 2) {
			dynamic.color = borderColors[5];
			dynamic.emoji = emojiIcon[5];
		} else {
			dynamic.color = borderColors[6];
			dynamic.emoji = emojiIcon[6];
		}

		return (
			<div className="Joke">
				<div className="Joke-btns">
					<i
						className="fa-solid fa-circle-arrow-up"
						onClick={this.props.onIncreaseScore}></i>
					<span
						className="Joke-score"
						style={{ borderColor: `${dynamic.color}` }}>
						{joke.score}
					</span>
					<i
						className="fa-solid fa-circle-arrow-down"
						onClick={this.props.onDecreaseScore}></i>
				</div>
				<div className="Joke-text">{joke.joke}</div>
				<div className="Joke-smiley">
					<i className={dynamic.emoji}></i>
				</div>
			</div>
		);
	}
}
