
export default class FormValidator {
  constructor(objConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = objConfig.formSelector;
    this._inputSelector = objConfig.inputSelector;
    this._submitButtonSelector = objConfig.submitButtonSelector;
    this._inactiveButtonClass = objConfig.inactiveButtonClass;
    this._inputErrorClass = objConfig.inputErrorClass;
    this._errorClass = objConfig.errorClass;
    this._buttonElement =  this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      })
    });
    this._toggleButtonState();
  }

  _checkValidity(inputElement) {
     if (inputElement.validity.valid)  {
      this._hideError(inputElement);
     }
     else {
      this._showError(inputElement);
     }
  }

  _hideError(inputElement) {
    const showErrorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
    showErrorElement.textContent = '';
    showErrorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }
  _showError(inputElement) {
    const showErrorElement =  this._formElement.querySelector(`.${inputElement.id}-error`);
    showErrorElement.textContent = inputElement.validationMessage;
    showErrorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  clearValidation () {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._toggleButtonState();
    }
}
