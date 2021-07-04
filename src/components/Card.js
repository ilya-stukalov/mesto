
export default class Card {
  constructor(selectorTemplate, ownerId, item, { handleCardClick, like, dislike, handleDeleteCard }) {
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
    this._cardName = item.name;
    this._cardLink = item.link;
    this._cardLikes = item.likes.length;
    this._like = like;
    this._dislike = dislike;
    this._id = item._id;
    this._likes = item.likes;
    this._ownerId = ownerId;
    this._cardOwnerId = item.owner._id;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() { //повторить
    const cardElement = document
    .querySelector(this._selectorTemplate)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.setAttribute('id', `${this._id}`);
    this._likeButton = this._element.querySelector('.element__button');
    this._trashButton = this._element.querySelector('.element__trash-button');
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._elementPhoto.src = this._cardLink;
    this._elementPhoto.alt = 'Изображение' + ' ' + this._cardName;
    this._element.querySelector('.element__text').textContent = this._cardName;
    this._setEventListeners();
    this._checkOwnLike();
    this._checkisCardOwn();
    this.updateLikeCount(this._cardLikes);
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleButtonClick();
      });
      this._trashButton.addEventListener('click', () => {
      this._handeTrashButtonClick();
      });
      this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleButtonClick() {
    if (this._likeButton.classList.contains('element__button_active')) 
    {
      this._deleteLikeClass();
      this._dislike(this._id);
    }
    else {
      this._addLikeClass();
      this._like(this._id);
    }
  }

  _addLikeClass() {
    this._likeButton.classList.add('element__button_active');
  }

  _deleteLikeClass() {
    this._likeButton.classList.remove('element__button_active');
  }

  _checkOwnLike() {

    const found = this._likes.some(like => like._id === this._ownerId);
    if (found) {
      this._addLikeClass(); 
    }
    else 
    this._deleteLikeClass();
  }

  updateLikeCount(count) {
    this._likeCounter.textContent = count;
  }

  _handeTrashButtonClick() {
    this._handleDeleteCard(this._id, this._element);
  }

  _checkisCardOwn() {
  if (this._cardOwnerId !== this._ownerId) {
    this._hideTrashButton();
  }
  else {
    true;
  }
  }

  _hideTrashButton() {
    this._trashButton.classList.add('element__trash-button_inactive');
  }
}
