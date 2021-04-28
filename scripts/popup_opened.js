

// popap для изменения профиля:

let popupEditProfile = document.querySelector('#popup__edit-profile');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popupEditProfile.querySelector('.popup__close-icon');
let formElement = popupEditProfile.querySelector('.form__container');
let nameInput = popupEditProfile.querySelector('.form__item_type_name');
let jobInput = popupEditProfile.querySelector('.form__item_type_description');
let title = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

function openPopup() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = description.textContent;
}

function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  description.textContent = jobInput.value;
  popupEditProfile.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);



// создание карточек с помощью js:

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

function addCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#cards').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = document.querySelector('.element__trash-button');
  cardElement.querySelector('.element__text').textContent = cardName;
  cardElement.querySelector('.element__photo').src = cardLink;
  cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  });
  cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    const listItem = eventTarget.closest('.element');
    listItem.remove();
  });
  cardElement.querySelector('.element__photo').addEventListener('click', openPopupPhoto);
  elementsContainer.prepend(cardElement);
}

for (i = 0; i < 6; i += 1) {
  addCard(initialCards[i].name, initialCards[i].link)
}

// popup для добавления карточек мест:
let popupEditCard = document.querySelector('#popup__edit-card');
let addButton = document.querySelector('.profile__add-button');
let cardCloseButton = popupEditCard.querySelector('.popup__close-icon');
let cardFormElement = popupEditCard.querySelector('.form__container');
let cardNameInput = popupEditCard.querySelector('.form__item_type_name');
let cardLinkInput = popupEditCard.querySelector('.form__item_type_description');

function openPopupNewCard() {
  popupEditCard.classList.add('popup_opened');
}

function closePopupNewCard() {
  popupEditCard.classList.remove('popup_opened');
}

addButton.addEventListener('click', openPopupNewCard);
cardCloseButton.addEventListener('click', closePopupNewCard);

function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  popupEditCard.classList.remove('popup_opened');
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

cardFormElement.addEventListener('submit', cardFormSubmitHandler);

// popup для открытия фото
const popupPhoto = document.querySelector('#popup-photo');
const elementPhoto = document.querySelectorAll('.element__photo');
const elementPhotoArray = Array.from(elementPhoto);
const popupPhotoCloseButton = document.querySelector('.popup-photo__close-icon');

function openPopupPhoto(evt) {
  const popupPhotoImg = document.querySelector('.popup-photo__img');
  const popupPhotoDescription = document.querySelector('.popup-photo__description');
  const eventTarget = evt.target.getAttribute('src');
  popupPhoto.classList.add('popup-photo_opened');
  popupPhotoImg.setAttribute('src', eventTarget);
  const evT = evt.target;
  const descriptionArray = Array.from(evT.nextElementSibling.nextElementSibling.children);
  console.log(descriptionArray[0].textContent);
  popupPhotoDescription.textContent = descriptionArray[0].textContent;
}

function closePopupPhoto() {
  popupPhoto.classList.remove('popup-photo_opened');
}

popupPhotoCloseButton.addEventListener('click', closePopupPhoto);


