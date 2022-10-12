/** @format */

import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

const dadJokeURL = 'https://icanhazdadjoke.com/';
const axiosConfig = {
	headers: { Accept: 'application/json' },
};

export default class JokeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokeList: [],
		};
	}

	componentDidMount() {
		axios.get(dadJokeURL, axiosConfig).then((res) => {
			const resJoke = res.data;
			const newJoke = { ...resJoke, score: 0 };
			this.setState((st) => {
				return { jokeList: [...st.jokeList, newJoke] };
			});
		});
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
