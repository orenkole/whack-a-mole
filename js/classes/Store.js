import * as config from "../constants/config.js";

export class Store {
	constructor() {
		this.state = {
			pureCells: [],
			successCells: [],
			failedCells: [], 
			difficultyLevel: {
				highlightDuration: config.NORMAL_HIGHLIGHT_DURATION,
				checkInterval: config.NORMAL_CHECK_INTERVAL
			}
		};
		this.subscribers = {};
	}

	subscribe(event, subscriber) {
		if(!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(subscriber);
	}

	publish(event, data) {
		if(!this.subscribers[event]) {
			return;
		}
		console.log(this.subscribers[event])
		this.subscribers[event].forEach(subscriber => {subscriber(data)})
	}

	get(key) {
		return this.state[key];
	}

	setDifficalty(difficalty) {
		switch(difficalty) {
			case "normal":
				this.state["difficultyLevel"]["highlightDuration"] = config.NORMAL_HIGHLIGHT_DURATION;
				this.state["difficultyLevel"]["checkInterval"] = config.NORMAL_CHECK_INTERVAL;
				break;
			case "easy":
				this.state["difficultyLevel"]["highlightDuration"] = config.EASY_HIGHLIGHT_DURATION;
				this.state["difficultyLevel"]["checkInterval"] = config.EASY_CHECK_INTERVAL;
				break;
			case "hard":
				this.state["difficultyLevel"]["highlightDuration"] = config.HARD_HIGHLIGHT_DURATION;
				this.state["difficultyLevel"]["checkInterval"] = config.HARD_CHECK_INTERVAL;
				break;
			default:
				this.state["difficultyLevel"]["highlightDuration"] = config.NORMAL_HIGHLIGHT_DURATION;
				this.state["difficultyLevel"]["checkInterval"] = config.NORMAL_CHECK_INTERVAL;
				break;
		}
	}

	setResult(result) {
		switch(result) {
			case "win": 
				this.state.result = "win";
				break;
			case "loose":
				this.state.result = "loose";
				break;
		}
	}
}