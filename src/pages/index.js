import './index.css';
import Card from './../components/Card.js';
import Section from './../components/Section.js';
import UserInfo from './../components/UserInfo.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import FormValidator from './../components/FormValidator.js';
import { initialCards } from './../utils/initial-cards.js';
import {profileEditButton,
  profileFormElement,
  addButton,
  cardFormElement,
  containerSelector,
  objConfig } from './../utils/constants.js';

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#cards', {
      handleCardClick: () => {
        popupWithImage.open(item.name, item.link);
      }
    })
    const cardElement = card.generateCard();
    return cardElement;
  }
}, containerSelector);

const popupWithFormProfile = new PopupWithForm('#popup__edit-profile',
{
  submit: (profileElement) => {
    userInfo.setUserInfo(profileElement);
    popupWithFormProfile.close();
  },
  setInputs: () => {
    document.querySelector('#profile-name-input').value = userInfo.getUserInfo().userName;
    document.querySelector('#profile-description-input').value = userInfo.getUserInfo().userDescription;
    profileForm.clearValidation(profileFormElement);
  }
});

const popupWithImage = new PopupWithImage('#popup-photo');
const popupWithFormCard = new PopupWithForm('#popup__edit-card',
{
  submit: (cardElement) => {
    defaultCardList.addItem(cardElement);
    popupWithFormCard.close();
  },
  setInputs: () => {
    document.querySelector('#place-name-input').value = '';
    document.querySelector('#place-link-input').value = '';
  }
});

const userInfo = new UserInfo({
  userInfoNameSelector: '.profile__name',
  userInfoDescriptionSelector: '.profile__description'});

const cardForm = new FormValidator(objConfig, cardFormElement);
const profileForm = new FormValidator(objConfig, profileFormElement);

addButton.addEventListener('click', () => {
  popupWithFormCard.open();
  cardForm.clearValidation(cardFormElement);
});

profileEditButton.addEventListener('click', () => {
  popupWithFormProfile.open();
});

defaultCardList.renderItems();
popupWithFormCard.setEventListeners();
popupWithFormProfile.setEventListeners();
cardForm.enableValidation();
profileForm.enableValidation();
popupWithImage.setEventListeners();
