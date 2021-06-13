
export default class FormValidator {
  constructor(objConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = objConfig.formSelector;
    this._inputSelector = objConfig.inputSelector;
    this._submitButtonSelector = objConfig.submitButtonSelector;
    this._inactiveButtonClass = objConfig.inactiveButtonClass;
    this._inputErrorClass = objConfig.inputErrorClass;
    this._errorClass = objConfig.errorClass;
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  _setEventListeners(formElement) {
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll( this._inputSelector ));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(formElement, inputElement);
        this._toggleButtonState(buttonElement, inputList);
      })
    });
    this._toggleButtonState(buttonElement, inputList);
  }

  _checkValidity(formElement, inputElement) {
     if (inputElement.validity.valid)  {
      this._hideError(formElement, inputElement);
     }
     else {
      this._showError(formElement, inputElement);
     }
  }

  _hideError(formElement, inputElement) {
    const showErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
    showErrorElement.textContent = '';
    showErrorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }
  _showError(formElement, inputElement) {
    const showErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
    showErrorElement.textContent = inputElement.validationMessage;
    showErrorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(buttonElement, inputList) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  clearValidation (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${this._inputSelector}`));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideError(formElement, inputElement);
    });
    this._toggleButtonState(buttonElement, inputList);
    }
}
