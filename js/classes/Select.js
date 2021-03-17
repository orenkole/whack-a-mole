import {store} from "../components/store.js";
import HtmlElement from "./HtmlElement.js ";

export class Select extends HtmlElement {
  constructor({tagName = "select",
    classes = [],
    attributes = [],
    text = "",
    values = [],
    name = ""
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    });
    this.values = values;
    this.createOptions();
    this.element.name = name;
  }
  createOptions() {
    this.values.forEach(value => {
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.text = value;
      this.element.append(optionElement);
    })
  }
}
