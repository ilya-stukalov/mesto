
import { openPopup, popupPhoto } from './index.js';
export class Card {

  constructor(cardName, cardLink, selectorTemplate) {
    this._selectorTemplate = selectorTemplate;
    this._cardName = cardName;
    this._cardLink = cardLink;
  }

  _getTemplate() {
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
      this._handlePhotoClick();
    });
  }

  _handleButtonClick() {
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
  }

  _handeTrashButtonClick() {
    this._element.querySelector('.element__trash-button').closest('.element').remove();
  }

  _handlePhotoClick() {
    const popupPhotoElement = document.querySelector('.popup__img');
    popupPhotoElement.setAttribute('src', this._cardLink);
    popupPhotoElement.setAttribute('alt', this._cardNameAlt);
    document.querySelector('.popup__description').textContent = this._cardName;
    openPopup(popupPhoto);
  }
}
