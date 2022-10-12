/** @format */

import React, { Component } from 'react';

export default class Joke extends Component {
	render() {
		const { joke, lp } = this.props;
		return (
			<div>
				<p>
					{lp} - {joke.joke} - score: {joke.score}
				</p>
			</div>
		);
	}
}
