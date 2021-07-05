import './index.css';
import Card from './../components/Card.js';
import Section from './../components/Section.js';
import UserInfo from './../components/UserInfo.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import FormValidator from './../components/FormValidator.js';
import Api from './../components/Api.js';
import PopupWithConfirm from './../components/PopupWithConfirm.js';

import {profileEditButton,
  profileFormElement,
  addButton,
  cardFormElement,
  containerSelector,
  objConfig, 
  profileName, 
  profileDescription,
  avatarEditButton, 
  avatarFormElement} from './../utils/constants.js';
let ownerId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25/',
    headers: {
      authorization: 'bbfa3ff1-62aa-4f58-bfbd-0546f73cf56a',
      'Content-Type': 'application/json'
    }
});
const popupWithConfirm = new PopupWithConfirm('#popup__confirm', {
  api: (id, element) => {
    api.deletePhoto(id)
      .then(() => {
         element.remove(); 
      })
      .then(() => {
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }}); 

const defaultCardList = new Section({
  renderer: (item) => {
    const card = new Card('#cards', ownerId, item, {
      handleCardClick: () => {
        popupWithImage.open(item.name, item.link);
      },
      like: (id) => {
        api.putLike(id)
          .then((data) => {
            return data.likes.length
        })
          .then((data) => {
            card.updateLikeCount(data);
          })
          .catch((err) => {
            console.log(err);
        })
      },
      dislike: (id) => {
        api.deleteLike(id)
          .then((data) => {
            return data.likes.length
          })
          .then((data) => {
            card.updateLikeCount(data);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      handleDeleteCard: (id, element) => {
        popupWithConfirm.open(id, element);
      }
    }
    )
    const cardElement = card.generateCard();
    return cardElement;
  }
}, containerSelector);

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    ownerId = res._id;
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    api.getInitialCards()
      .then((data) => { 
        defaultCardList.renderItems(data, 'initial');
      })
      .catch((err) => {
        console.log(err);
      }); 
  })

const popupWithFormProfile = new PopupWithForm('#popup__edit-profile',
{
  submit: (data) => {
    popupWithFormProfile.renderLoading(true);
    api.updateUserInfo(data) 
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .then(() => {
        popupWithFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormProfile.renderLoading(false);
    })
  },
  setInputs: () => {
    profileName.value = userInfo.getUserInfo().userName;
    profileDescription.value = userInfo.getUserInfo().userDescription;
    profileForm.clearValidation();
  }
});

const popupWithImage = new PopupWithImage('#popup-photo');
const popupWithFormCard = new PopupWithForm('#popup__edit-card',
{
  submit: (data) => {
    popupWithFormCard.renderLoading(true);
    api.insertNewCard(data)
      .then((res) => {
        defaultCardList.addItem(res, 'additional');
      })
      .then(() => {
        popupWithFormCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormCard.renderLoading(false);
      })
  
  },
  setInputs: () => {
  cardForm.clearValidation();
  }
});

const userInfo = new UserInfo({
  userInfoNameSelector: '.profile__name',
  userInfoDescriptionSelector: '.profile__description',
  userInfoAvatarSelector: '.profile__avatar'});

const cardForm = new FormValidator(objConfig, cardFormElement);
const profileForm = new FormValidator(objConfig, profileFormElement);
const avatarForm = new FormValidator(objConfig, avatarFormElement);


addButton.addEventListener('click', () => {
  popupWithFormCard.open();
});

profileEditButton.addEventListener('click', () => {
  popupWithFormProfile.open();
});

popupWithFormCard.setEventListeners();
popupWithFormProfile.setEventListeners();
cardForm.enableValidation();
profileForm.enableValidation();
popupWithImage.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  popupWithAvatarForm.open();
});

const popupWithAvatarForm = new PopupWithForm('#popup__edit-avatar',
  {
    submit: (data) => {
      popupWithAvatarForm.renderLoading(true);
      api.updateAvatar(data)
        .then((res) => {
          userInfo.updateAvatar(res);
        })
        .then(() => {
          popupWithAvatarForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithAvatarForm.renderLoading(false);
        })
    },
    setInputs: () => {
      avatarForm.clearValidation();
  }
});

popupWithAvatarForm.setEventListeners();

avatarForm.enableValidation();


