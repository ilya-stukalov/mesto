
export default class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headerAuthorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
    }



  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
      }
    })

    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
        })
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
          }
        })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
          }
          return res.json();
      
      })  
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
          },
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
          return res.json();
      })
  }

  insertNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }) 
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
          return res.json();
      })
  }

  putLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
      }
    })
      .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
      }
      })
      .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: data.link
          })
      })
      .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
  }

  deletePhoto(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headerAuthorization,
          'Content-Type': this._contentType
      }

    })
      .then((res) => {
        if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
  }
}