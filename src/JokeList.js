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
			jokeList: JSON.parse(window.localStorage.getItem('jokeList')) || [],
			loading: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if (this.state.jokeList.length === 0) this.getJokes();
	}

	async getJokes() {
		//setting loader to show
		this.setState({ loading: true });
		const jokeList = [];
		try {
			while (jokeList.length < this.props.numJokesToGet) {
				const res = await axios.get(dadJokeURL, axiosConfig);
				const joke = res.data;
				const newJoke = { ...joke, score: 0 };
				//checking if joke is on the list
				const checkDuplicate = jokeList.filter(
					(joke) => joke.id === newJoke.id
				);
				const checkDuplicateInState = this.state.jokeList.filter(
					(joke) => joke.id === newJoke.id
				);
				if (checkDuplicate.length === 0 && checkDuplicateInState.length === 0)
					jokeList.push(newJoke);
			}
			this.setState(
				(st) => {
					return { jokeList: [...st.jokeList, ...jokeList], loading: false };
				},
				() =>
					window.localStorage.setItem(
						'jokeList',
						JSON.stringify(this.state.jokeList)
					)
			);
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	}

	changeScore(jokeId, delta) {
		const newJokeList = this.state.jokeList.map((joke) => {
			if (joke.id === jokeId) {
				return {
					...joke,
					score: joke.score + delta,
				};
			}
			return joke;
		});
		this.setState(
			{ jokeList: newJokeList.sort((a, b) => b.score - a.score) },
			() =>
				window.localStorage.setItem(
					'jokeList',
					JSON.stringify(this.state.jokeList)
				)
		);
	}

	handleClick() {
		this.getJokes();
	}

	render() {
		const { jokeList, loading } = this.state;
		const jokeListRender = jokeList.map((joke) => (
			<Joke
				key={joke.id}
				joke={joke}
				onIncreaseScore={() => this.changeScore(joke.id, 1)}
				onDecreaseScore={() => this.changeScore(joke.id, -1)}
			/>
		));
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>DAD</span> Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="icon"></img>
					<button className="JokeList-getmore" onClick={this.handleClick}>
						Add Jokes
					</button>
				</div>
				<div className="JokeList-jokes">
					{loading ? (
						<div id="preloader">
							<div id="loader" />
						</div>
					) : (
						jokeListRender
					)}
				</div>
			</div>
		);
	}
}
