import HtmlElement from "./HtmlElement.js";

export class TableRow extends HtmlElement {
  constructor({tagName = "tr",
    classes = [],
    attributes = [],
  } = {}) {
    super({tagName,
      classes,
      attributes,
    })
  }
}
