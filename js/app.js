import {store} from "./components/store.js";
import {root} from "./components/root.js";
import {table} from "./components/table.js";
import {startBtn} from "./components/startBtn.js";
import {selectDifficalty} from "./components/selectDifficalty.js";
import {resultModal} from "./components/resultModal.js";

selectDifficalty.render(root);
startBtn.render(root);
table.render(root);
resultModal.render(root);

window.store = store;

// set difficalty
store.publish("difficulty-change", store.get("difficultyLevel"));
