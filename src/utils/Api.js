
class Api {
    constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`There is following server error: ${res.status}`)
      }
    }
  
    getInitialCards() {
      return fetch(`${this._url}cards`, {
        headers: this._headers
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    getUserData() {
      return fetch(`${this._url}users/me`, {
        headers: this._headers
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    updateUserData(profileInputsData) {
      return fetch(`${this._url}users/me`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          name: profileInputsData.name,
          about: profileInputsData.description })
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    sendingCard({ name, link }) {
      return fetch(`${this._url}cards`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({name, link})
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}cards/${cardId}`, {
        headers: this._headers,
        method: 'DELETE',
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    updateUserAvatar(avatarLink) {
      return fetch(`${this._url}users/me/avatar`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: avatarLink.avatar
        })
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    likeCard(cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'PUT',
      })
        .then(res => {return this._getResponseData(res)})
    }
  
    unlikeCard(cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE',
      })
        .then(res => {return this._getResponseData(res)})
    }
  }

export default Api;
