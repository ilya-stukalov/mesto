
export default class Card {
  constructor(cardName, cardLink, selectorTemplate, { handleCardClick }) {
    this._selectorTemplate = selectorTemplate;
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() { //повторить
    const cardElement = document
    .querySelector(this._selectorTemplate)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button');
    this._trashButton = this._element.querySelector('.element__trash-button');
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementPhoto.src = this._cardLink;
    this._elementPhoto.alt = 'Изображение' + ' ' + this._cardName;
    this._element.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleButtonClick();
      });
      this._trashButton.addEventListener('click', () => {
      this._handeTrashButtonClick();
      });
      this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleButtonClick() {
    this._likeButton.classList.toggle('element__button_active');
  }

  _handeTrashButtonClick() {
    this._element.remove();
  }
}
