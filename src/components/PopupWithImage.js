import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoImg = this._popup.querySelector('.popup__img');
    this._popupPhotoDescription = this._popup.querySelector('.popup__description');
  }

  open(name, link) {
    this._popupPhotoImg.setAttribute('src', link);
    this._popupPhotoImg.setAttribute('alt', name);
    this._popupPhotoDescription.textContent = name;
    super.open();
  }
}
