import './index.css';

import Card from './../components/Card.js';
import Section from './../components/Section.js';
import UserInfo from './../components/UserInfo.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import FormValidator from './../components/FormValidator.js';


import { initialCards } from './../utils/initial-cards.js';

import { popupEditProfile, popupEditCard,
  profileEditButton,
  profileFormElement,
  nameInput,
  jobInput,
  title,
  description,
  addButton,
  cardFormElement,
  cardNameInput,
  cardLinkInput,
  containerSelector,
  objConfig } from './../utils/constants.js';






function createCard(cardName, cardLink) {
  const card = new Card(cardName, cardLink, '#cards', {
    handleCardClick: () => {
      console.log('test');
      const popupWithImage = new PopupWithImage('#popup-photo', cardName, cardLink);
      popupWithImage.open();
    }
  });
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#cards', {
        handleCardClick: () => {
        const popupWithImage = new PopupWithImage('#popup-photo', item.name, item.link);
        popupWithImage.open();
      }
    });
    const cardElement = card.generateCard();
     defaultCardList.addItem(cardElement);
  }
}, containerSelector);

const popupWithFormProfile = new PopupWithForm ('#popup__edit-profile',
{
  submit: () => {
    userInfo.setUserInfo({name: nameInput.value, description: jobInput.value});

  },
  setInputs: () => {
    nameInput.value = userInfo.getUserInfo().userName;
    jobInput.value = userInfo.getUserInfo().userDescription;
    profileForm.clearValidation(profileFormElement);
  }
});

const popupWithFormCard = new PopupWithForm ('#popup__edit-card',
{
  submit: () => {
    createCard(cardNameInput.value, cardLinkInput.value);
  },
  setInputs: () => {
    document.querySelector('#place-name-input').value = '';
    document.querySelector('#place-description-input').value = '';
  }
});

const userInfo = new UserInfo ({
  userInfoNameSelector: '.profile__name',
  userInfoDescriptionSelector: '.profile__description'});
  //to do: разобраться, почему надо в таком виде передавать

defaultCardList.renderItems();

const cardForm = new FormValidator (objConfig, cardFormElement);
cardForm.enableValidation();

const profileForm = new FormValidator (objConfig, profileFormElement);
profileForm.enableValidation();


addButton.addEventListener('click', () => {
  popupWithFormCard.open();
  cardForm.clearValidation(cardFormElement);
});

profileEditButton.addEventListener('click', () => {
  popupWithFormProfile.open();
});

popupWithFormCard.setEventListeners();
popupWithFormProfile.setEventListeners();






