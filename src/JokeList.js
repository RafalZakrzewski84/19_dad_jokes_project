/** @format */

import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

const dadJokeURL = 'https://icanhazdadjoke.com/';
const axiosConfig = {
	headers: { Accept: 'application/json' },
};

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 15,
	};

	constructor(props) {
		super(props);
		this.state = {
			jokeList: [],
		};
	}

	async componentDidMount() {
		this.getJokes();
	}

	async getJokes() {
		const jokeList = [];
		while (jokeList.length < this.props.numJokesToGet) {
			const res = await axios.get(dadJokeURL, axiosConfig);
			const joke = res.data;
			const newJoke = { ...joke, score: 0 };
			//checking if joke is in list
			const checkDuplicate = jokeList.filter((joke) => joke.id == newJoke.id);
			console.log(checkDuplicate.length);
			if (checkDuplicate.length === 0) jokeList.push(newJoke);
		}
		this.setState((st) => {
			return { jokeList: [...st.jokeList, ...jokeList] };
		});
	}

	render() {
		const jokeListRender = this.state.jokeList.map((joke, idx) => (
			<Joke lp={idx + 1} key={joke.id} joke={joke} />
		));
		return (
			<div>
				<h2>Joke List</h2>
				{jokeListRender}
			</div>
		);
	}
}
