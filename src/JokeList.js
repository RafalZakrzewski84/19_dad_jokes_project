/** @format */

import React, { Component } from 'react';
import Joke from './Joke';

export default class JokeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokeList: [],
		};
	}

	render() {
		return (
			<div>
				<h2>Joke List</h2>
				<Joke />
			</div>
		);
	}
}
