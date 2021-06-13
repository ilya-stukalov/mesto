export const popupEditProfile = document.querySelector('#popup__edit-profile');
export const popupEditCard = document.querySelector('#popup__edit-card');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileFormElement = popupEditProfile.querySelector('.form__container');
export const nameInput = popupEditProfile.querySelector('.form__item_type_name');
export const jobInput = popupEditProfile.querySelector('.form__item_type_description');
export const title = document.querySelector('.profile__name');
export const description = document.querySelector('.profile__description');
export const addButton = document.querySelector('.profile__add-button');
export const cardFormElement = popupEditCard.querySelector('.form__container');
export const cardNameInput = popupEditCard.querySelector('.form__item_type_name');
export const cardLinkInput = popupEditCard.querySelector('.form__item_type_description');
export const containerSelector = '.elements';

export const objConfig = {
  formSelector: '.form__container',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active',
};

