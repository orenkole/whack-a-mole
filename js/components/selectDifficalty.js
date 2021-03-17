import {store} from "./store.js"
import {Select} from "../classes/Select.js";

export const selectDifficalty = new Select({
	values: ["easy", "normal", "hard"],
	classes: ["form-select", "mb-3", "mt-3", "w-25", "mx-auto"]
})

selectDifficalty.element.addEventListener("change", () => {
    store.setDifficalty(selectDifficalty.element.value); 
    store.publish("difficulty-change", store.get("difficultyLevel"));
})