/** @format */

import React, { Component } from 'react';
import axios from 'axios';

import './JokeList.css';

import Joke from './Joke';

const dadJokeURL = 'https://icanhazdadjoke.com/';
const axiosConfig = {
	headers: { Accept: 'application/json' },
};

export default class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 5,
	};

	constructor(props) {
		super(props);
		this.state = {
			jokeList: [],
		};
		this.increaseScore = this.increaseScore.bind(this);
		this.decreaseScore = this.decreaseScore.bind(this);
	}

	componentDidMount() {
		this.getJokes();
	}

	async getJokes() {
		const jokeList = [];
		while (jokeList.length < this.props.numJokesToGet) {
			const res = await axios.get(dadJokeURL, axiosConfig);
			const joke = res.data;
			const newJoke = { ...joke, score: 0 };
			//checking if joke is on the list
			const checkDuplicate = jokeList.filter((joke) => joke.id == newJoke.id);
			if (checkDuplicate.length === 0) jokeList.push(newJoke);
		}
		this.setState((st) => {
			return { jokeList: [...st.jokeList, ...jokeList] };
		});
	}

	increaseScore(jokeId) {
		const newJokeList = this.state.jokeList.map((joke) => {
			if (joke.id === jokeId) {
				return {
					...joke,
					score: joke.score + 1,
				};
			}
			return joke;
		});
		this.setState({ jokeList: newJokeList });
	}

	decreaseScore(jokeId) {
		const newJokeList = this.state.jokeList.map((joke) => {
			if (joke.id === jokeId) {
				return {
					...joke,
					score: joke.score - 1,
				};
			}
			return joke;
		});
		this.setState({ jokeList: newJokeList });
	}

	render() {
		const jokeListRender = this.state.jokeList.map((joke) => (
			<Joke
				key={joke.id}
				joke={joke}
				onIncreaseScore={this.increaseScore}
				onDecreaseScore={this.decreaseScore}
			/>
		));
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>DAD</span> Jokes
					</h1>
					<img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"></img>
					<button className="JokeList-getmore">New Jokes</button>
				</div>
				<div className="JokeList-jokes">{jokeListRender}</div>
			</div>
		);
	}
}
