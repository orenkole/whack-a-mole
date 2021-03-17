import HtmlElement from "./HtmlElement.js";

export default class Div extends HtmlElement {
  constructor({tagName = "Div",
    classes = [],
    attributes = [],
  } = {}) {
    super({tagName,
      classes,
      attributes,
    })
  }
}