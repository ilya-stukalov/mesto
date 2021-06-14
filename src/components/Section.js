
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((cardElement) => {
      this.addItem(cardElement);
    });
  }

  addItem(cardElement) {
    this._container.prepend(this._renderer(cardElement));
  }

}
