import HtmlElement from "./HtmlElement.js";

export class TableCell extends HtmlElement {
  constructor({tagName = "td",
    classes = ["border", "border-primary"],
    attributes = [{"style": "width: 5vh; height: 5vh"}],    
  } = {}) {
    super({tagName,
      classes,
      attributes,
    })
  }
}
