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
		numJokesToGet: 10,
	};

	constructor(props) {
		super(props);
		this.state = {
			jokeList: [],
		};
	}

	async componentDidMount() {
		const jokeList = await this.getJokes();
		this.setState((st) => {
			return { jokeList: [...st.jokeList, ...jokeList] };
		});
	}

	async getJokes() {
		const jokeList = [];
		try {
			for (let i = 0; i < this.props.numJokesToGet; i++) {
				const res = await axios.get(dadJokeURL, axiosConfig);
				if (res.data.status != 200) {
					throw new Error('Sth. went wrong.');
				}
				const resJoke = res.data;
				const newJoke = { ...resJoke, score: 0 };
				jokeList.push(newJoke);
			}
		} catch (error) {
			console.log(error);
		}
		return jokeList;
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
