
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.form__container');
let nameInput = document.querySelector('.form__item_type_name');
let jobInput = document.querySelector('.form__item_type_description');
let title = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);



