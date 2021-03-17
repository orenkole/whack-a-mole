import {store} from "./store.js";
import Button from "../classes/Button.js";

export const startBtn = new Button({
	text: "Start game"
})

startBtn.element.addEventListener("click", () => {store.publish("game-start")});

store.subscribe("game-began", () => {startBtn.element.disabled = true})
store.subscribe("game-over", () => {startBtn.element.disabled = false})