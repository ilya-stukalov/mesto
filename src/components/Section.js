export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data, process) {
    data.forEach((cardElement) => {
      this.addItem(cardElement, process);
    });
  }

  addItem(cardElement, process) {
    if (process === 'initial') {
      this._container.append(this._renderer(cardElement));
    }
    if (process === 'additional') {
      this._container.prepend(this._renderer(cardElement));
    }
  }
}
