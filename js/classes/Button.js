import HtmlElement from "./HtmlElement.js";

export default class Button extends HtmlElement {
  constructor({tagName = "button",
    classes = ["btn", "btn-primary", "mb-3", "d-block", "mx-auto"],
    attributes = [],
    text = "",
    type = ""
  } = {}) {
    super({tagName,
      classes,
      attributes,
      text
    })
    this.element.type = type;
  }
}
