
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
    const elementPhoto = this._element.querySelector('.element__photo');
    elementPhoto.src = this._cardLink;
    elementPhoto.alt = 'Изображение' + ' ' + this._cardName;
    this._element.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._handleButtonClick();
      });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handeTrashButtonClick();
      });
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick();
    });

  }

  _handleButtonClick() {
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
  }

  _handeTrashButtonClick() {
    this._element.querySelector('.element__trash-button').closest('.element').remove();
  }
}
