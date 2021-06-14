import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit, setInputs } ) {
    super(popupSelector);
    this._submit = submit;
    this._setInputs = setInputs;
    this._popupWithForm = document.querySelector(popupSelector);
    this._inputList = this._popupWithForm.querySelectorAll('.form__item');
  }

  open() {
    super.open();
    this._setInputs();
  }

  _getInputValues() {
    this._formValues = { };
    this._inputList.forEach( (item) => {
    this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupWithForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
  });
  }
  close() {
    super.close();
    this._popupWithForm.querySelector('.form__container').reset();
  }
}
