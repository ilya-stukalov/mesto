import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, id, element, { api }) {
        super(popupSelector);
        this._api = api;
        this._id = id;
        this._element = element;
    }

    open() {
      super.open();
      this.setEventListeners();
    }
    

    _deleteCard = (evt) => {
        evt.preventDefault();
        this.close();
        this._api(this._id, this._element);
    }

    close() {
      super.close();
      this._popup.removeEventListener('submit', this._deleteCard);
    }
    

    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', this._deleteCard);
        
    };

}