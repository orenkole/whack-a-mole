import Div from "./Div.js";
import HtmlElement from "./HtmlElement.js";
import {store} from "../components/store.js";

export class ResultModal extends Div {
  constructor({
    classes = ["modal"],
    attributes = [{"tabindex": "-1"}]
  } = {}) {
    super({
      classes,
    })
  	this.createResulModal();
  }

  createResulModal = () => {
	this.modalDialog = new Div({
		classes: ["modal-dialog"]
	});
	this.modalDialog.render(this.element)

	this.modalContent = new Div({
		classes: ["modal-content"]
	});
	this.modalContent.render(this.modalDialog.element);

	this.modalHeader = new Div({
		classes: ["modal-header"]
	});
	this.modalHeader.render(this.modalContent.element);

	this.modalTitle = new HtmlElement({
		tagName: "h5",
		text: ``
	})
	this.modalTitle.render(this.modalHeader.element);

	store.subscribe("game-over", () => {
		this.modalTitle.element.textContent = `You ${store.get("result")}`;
		var myModal = new bootstrap.Modal(this.element, {
		  keyboard: false
		})

		myModal.show();
	})
  }
} 

