import {store} from "../components/store.js";
import {SIZE} from "../constants/config.js";
import HtmlElement from "./HtmlElement.js";
import {TableCell} from "./TableCell.js";
import {TableRow} from "./TableRow.js";

export class Table extends HtmlElement {
  constructor({
    tagName = "table",
    classes = ["d-grid", "justify-content-center"],
  } = {}) {
    super({
      tagName,
      classes,
    })
    this.selectDifficalty = this.selectDifficalty.bind(this);
    store.subscribe("difficulty-change", this.selectDifficalty);
    this.fillTable();
    this.element.addEventListener("click", (e) => {this.handleClick(e, this.chosenCell)});
    store.subscribe("game-start", () => {this.startGame()});
    this.HIGHLIGHT_DURATION;
    this.CHECK_INTERVAL;
    this.chosenCell;
  }

  startGame() {
    store.publish("game-began");
    store.state.pureCells = [...store.state.pureCells, ...store.state.successCells, ...store.state.failedCells];
    store.state.pureCells.forEach(pureCell => {pureCell.element.style.backgroundColor = "#fff";})
    store.state.successCells = [];
    store.state.failedCells = [];
    this.gameProcessId = setInterval(() => {this.highlightCell()}, this.CHECK_INTERVAL);
  }

  fillTable() {
    for(let rowIdx = 1; rowIdx <= SIZE; rowIdx++) {
      const row = new TableRow();
      for(let colIdx = 1; colIdx <= SIZE; colIdx++) {
        const cell = new TableCell();
        cell.render(row.element);
        store.state.pureCells.push(cell);
      }
      row.render(this.element);
    }
  }

  highlightCell() {    
    if(store.state.failedCells.length >= Math.ceil(SIZE * (SIZE / 2))) {
      // game over
      clearInterval(this.gameProcessId);
      clearTimeout(this.timerId);
      store.setResult("loose");
      store.publish("game-over");
    } else if(store.state.successCells.length >= Math.ceil(SIZE * (SIZE / 2))) {
      // game over
      clearInterval(this.gameProcessId);
      clearTimeout(this.timerId);
      store.setResult("win");
      console.log(store.get("result"))
      store.publish("game-over");
    } else {
      // game continues
      this.randomCellIndex = Math.floor(Math.random() * store.state.pureCells.length);
      this.chosenCell = store.state.pureCells[this.randomCellIndex];
      this.chosenCell.element.style.backgroundColor = "#00f";
      this.timerId = setTimeout(() => {this.moveCellToFailed(this.chosenCell)}, this.HIGHLIGHT_DURATION);
    }
  }

  moveCellToFailed(chosenCell) {
    chosenCell.element.style.backgroundColor = "#f00";
    store.state.pureCells = store.state.pureCells.filter(cell => cell !== chosenCell);
    store.state.failedCells = [...store.state.failedCells, chosenCell];
  }

  handleClick(e, chosenCell) {
    const clickedCell = store.state.pureCells.filter(cell => {
      return cell.element == e.target;
    })[0]
    console.log("Clicked Cell: ", clickedCell)
    console.log("Chosen Cell: ", chosenCell)
    if(clickedCell === chosenCell) {
      clickedCell.element.style.backgroundColor = "#0f0";
      store.state.pureCells = store.state.pureCells.filter(cell => cell !== clickedCell)
      store.state.successCells = [...store.state.successCells, clickedCell];
      clearTimeout(this.timerId);
    }
  }

  selectDifficalty({highlightDuration, checkInterval}) {
    this.HIGHLIGHT_DURATION = highlightDuration;
    this.CHECK_INTERVAL = checkInterval;
  }
}

// TODO: disable start button while playing