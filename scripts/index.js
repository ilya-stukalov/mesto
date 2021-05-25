import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-cards.js';

const popupEditProfile = document.querySelector('#popup__edit-profile');
const popupEditCard = document.querySelector('#popup__edit-card');
export const popupPhoto = document.querySelector('#popup-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popupEditProfile.querySelector('.popup__close-icon');
const profileFormElement = popupEditProfile.querySelector('.form__container');
const nameInput = popupEditProfile.querySelector('.form__item_type_name');
const jobInput = popupEditProfile.querySelector('.form__item_type_description');
const title = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const elementsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = popupEditCard.querySelector('.popup__close-icon');
const cardFormElement = popupEditCard.querySelector('.form__container');
const cardNameInput = popupEditCard.querySelector('.form__item_type_name');
const cardLinkInput = popupEditCard.querySelector('.form__item_type_description');
const buttonCardElement = cardFormElement.querySelector('.form__button');
const inputCardList = Array.from(cardFormElement.querySelectorAll('.form__item'));
const elementPhoto = document.querySelectorAll('.element__photo');
const elementPhotoArray = Array.from(elementPhoto);
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-icon');

const objConfig = {
  formSelector: '.form__container',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
};

const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyHandler);
}

function fillInputsPopupProfile() {

  openPopup(popupEditProfile);
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
  profileForm.clearValidation(profileFormElement);
}

 function handleProfileSubmit (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function createCard(cardName, cardLink) {
  const card = new Card(cardName, cardLink, '#cards');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
}

function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  createCard(cardNameInput.value, cardLinkInput.value);
  closePopup(popupEditCard);
}

function popupOverlayClickClose (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function openEditCardPopup() {
  cardFormElement.reset();
  cardForm.clearValidation(cardFormElement);
  openPopup(popupEditCard);

}

profileEditButton.addEventListener('click', fillInputsPopupProfile);
profileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
profileFormElement.addEventListener('submit', handleProfileSubmit);
addButton.addEventListener('click', () => openPopup(popupEditCard));
cardCloseButton.addEventListener('click', () => closePopup(popupEditCard));
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
cardCloseButton.addEventListener('click', () => closePopup(popupEditCard));

//turn on validation:
addButton.addEventListener('click', openEditCardPopup);

//close popup after click on overlay
popupPhoto.addEventListener('mousedown', popupOverlayClickClose);
popupEditProfile.addEventListener('mousedown', popupOverlayClickClose);
popupEditCard.addEventListener('mousedown', popupOverlayClickClose);

initialCards.forEach((item) => {
 createCard(item.name, item.link);
});

const cardForm = new FormValidator (objConfig, cardFormElement);
cardForm.enableValidation();

const profileForm = new FormValidator (objConfig, profileFormElement);
profileForm.enableValidation();


