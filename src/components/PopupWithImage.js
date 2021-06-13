import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupWithPhoto = document.querySelector(popupSelector);
    this._name = name;
    this._link = link;
    this._popupPhotoImg = this._popupWithPhoto.querySelector('.popup__img');
    this._popupPhotoDescription = this._popupWithPhoto.querySelector('.popup__description');
  }

  open() {
    this._popupPhotoImg.setAttribute('src', this._link);
    this._popupPhotoImg.setAttribute('alt', this._name);
    this._popupPhotoDescription.textContent = this._name;
    super.open();
    this.setEventListeners();
  }

  setEventListeners() {

    super.setEventListeners();
    }
}
