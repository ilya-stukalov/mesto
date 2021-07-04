import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit, setInputs } ) {
    super(popupSelector);
    this._submit = submit;
    this._inputList = this._popup.querySelectorAll('.form__item');
    this._setInputs = setInputs;
    this._button = this._popup.querySelector('.form__button');
    this._buttonText =  this._button.textContent;
   
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
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
  });
  }
  close() {
    super.close();
    this._popup.querySelector('.form__container').reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonText = 'Сохранение...';
    }
    else 
      this._button.textContent = this._buttonText;
} 
}
