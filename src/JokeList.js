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
