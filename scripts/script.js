const popupEditProfile = document.querySelector('#popup__edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popupEditProfile.querySelector('.popup__close-icon');
const profileFormElement = popupEditProfile.querySelector('.form__container');
const nameInput = popupEditProfile.querySelector('.form__item_type_name');
const jobInput = popupEditProfile.querySelector('.form__item_type_description');
const title = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const elementsContainer = document.querySelector('.elements');
const popupEditCard = document.querySelector('#popup__edit-card');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = popupEditCard.querySelector('.popup__close-icon');
const cardFormElement = popupEditCard.querySelector('.form__container');
const cardNameInput = popupEditCard.querySelector('.form__item_type_name');
const cardLinkInput = popupEditCard.querySelector('.form__item_type_description');
const buttonCardElement = cardFormElement.querySelector('.form__button');
const inputCardList = Array.from(cardFormElement.querySelectorAll('.form__item'));
const popupPhoto = document.querySelector('#popup-photo');
const elementPhoto = document.querySelectorAll('.element__photo');
const elementPhotoArray = Array.from(elementPhoto);
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-icon');

const objConfig = {
  formSelector: '.form__container',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(item) {
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
  clearValidation(profileFormElement, objConfig);
}

 function handleProfileSubmit (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function createCard(cardName, cardLink)  {
  const cardTemplate = document.querySelector('#cards').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardNameAlt = 'Изображение' + ' ' + cardName;
  const popupPhotoImg = document.querySelector('.popup__img');
  const popupPhotoDescription = document.querySelector('.popup__description');
  const elementPhoto = cardElement.querySelector('.element__photo');
  const elementText = cardElement.querySelector('.element__text');
  const elementButton = cardElement.querySelector('.element__button');
  const elementTrashButton = cardElement.querySelector('.element__trash-button');
  elementText.textContent = cardName;
  elementPhoto.src = cardLink;
  elementPhoto.alt = cardNameAlt;
  elementButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__button_active');
  });
  elementTrashButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  elementPhoto.addEventListener('click', function() {
    popupPhotoImg.setAttribute('src', cardLink);
    popupPhotoImg.setAttribute('alt', cardNameAlt);
    popupPhotoDescription.textContent = cardName;
    openPopup(popupPhoto);
  });

  return cardElement;
}

function addCard(container, element) {
    container.prepend(element);
  }

function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  addCard(elementsContainer, createCard(cardNameInput.value, cardLinkInput.value));
  closePopup(popupEditCard);
  cardFormElement.reset();
}

initialCards.forEach(function(item) {
  addCard(elementsContainer, createCard(item.name, item.link));
});

function cardOverlayClickClose(evt) {
  evt.target.classList.remove('popup_opened');
}

function openEditCardPopup() {
  openPopup(popupEditCard);
  toggleButtonState(buttonCardElement, inputCardList, objConfig);
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

//close popupPhoto after click on overlay
popupPhoto.addEventListener('click', cardOverlayClickClose);

enableValidation(objConfig);
