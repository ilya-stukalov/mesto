const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('#popup__edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupEditProfile.querySelector('.popup__close-icon');
const formElement = popupEditProfile.querySelector('.form__container');
const nameInput = popupEditProfile.querySelector('.form__item_type_name');
const jobInput = popupEditProfile.querySelector('.form__item_type_description');
const title = document.querySelector('.profile__name');

const description = document.querySelector('.profile__description');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const elementsContainer = document.querySelector('.elements');

const popupEditCard = document.querySelector('#popup__edit-card');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = popupEditCard.querySelector('.popup__close-icon');
const cardFormElement = popupEditCard.querySelector('.form__container');
const cardNameInput = popupEditCard.querySelector('.form__item_type_name');
const cardLinkInput = popupEditCard.querySelector('.form__item_type_description');

const popupPhoto = document.querySelector('#popup-photo');
const elementPhoto = document.querySelectorAll('.element__photo');
const elementPhotoArray = Array.from(elementPhoto);
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-icon');

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function fillInputsPoputProfile() {
  openPopup(popup);
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup(popup);
}

function createCard(cardName, cardLink)  {
  const cardTemplate = document.querySelector('#cards').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = document.querySelector('.element__trash-button');
  const cardNameAlt = 'Изображение' + ' ' + cardName;
  const popupPhotoImg = document.querySelector('.popup__img');
  const popupPhotoDescription = document.querySelector('.popup__description');
  cardElement.querySelector('.element__text').textContent = cardName;
  cardElement.querySelector('.element__photo').src = cardLink;
  cardElement.querySelector('.element__photo').alt = cardNameAlt;
  cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__button_active');
  });
  cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__photo').addEventListener('click', function() {
    popupPhotoImg.setAttribute('src', cardLink);
    popupPhotoImg.setAttribute('alt', cardName);
    console.log(cardName);
    popupPhotoDescription.textContent = cardName;
    openPopup(popupPhoto);
  });
  console.log(cardElement);
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



editButton.addEventListener('click', fillInputsPoputProfile);
closeButton.addEventListener('click', () => closePopup(popup));
formElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', () => openPopup(popupEditCard));
cardCloseButton.addEventListener('click', () => closePopup(popupEditCard));
cardFormElement.addEventListener('submit', cardFormSubmitHandler);

popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
