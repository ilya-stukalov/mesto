
const showError = (formElement, inputElement, objConfig) => {
  const { inputErrorClass, errorClass } = objConfig;
  const showErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
  showErrorElement.textContent = inputElement.validationMessage;
  showErrorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

const hideError = (formElement, inputElement, objConfig) => {
  const { inputErrorClass, errorClass } = objConfig;
  const showErrorElement = formElement.querySelector(`.${inputElement.id}-error`);
  showErrorElement.textContent = '';
  showErrorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

const checkValidity = (formElement, inputElement, objConfig) => {
  // if input valid?
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, objConfig);
  }
  else showError(formElement, inputElement, objConfig);
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList, objConfig) => {

  const { inactiveButtonClass, inputErrorClass, errorClass,  ...restConfig } = objConfig;
   if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, objConfig ) => {
  const { inputSelector, submitButtonSelector, openPopupButton, ...restConfig } = objConfig;
  const openPopupButtonList = Array.from(document.querySelectorAll(openPopupButton));

  //prevent page reload:
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  //find all inputs:
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  //find the only submit button:
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //add listeners on each inputElement:
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {

      checkValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList, restConfig);
    })
  });

  toggleButtonState(buttonElement, inputList, restConfig);

}

const enableValidation = (objConfig) => {
  const { formSelector, ...restConfig } = objConfig;
  //find forms:
  const formList = Array.from(document.querySelectorAll(formSelector));

  //add event listeners to all forms:
  formList.forEach((formElement) => {
     setEventListeners(formElement, restConfig);
  });
}

const clearValidation = (formElement, objConfig) => {
  const { errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass, ...restConfig } = objConfig;
  const errorElements = Array.from(formElement.querySelectorAll(`.${errorClass}`));
  const inputList = Array.from(formElement.querySelectorAll(`.${inputErrorClass}`));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  errorElements.forEach((errorElement) => {
    errorElement.classList.remove(errorClass);
  })
  inputList.forEach((input) => {
    input.classList.remove(inputErrorClass);
  })
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
  }
