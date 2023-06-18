import Api from "./Api.js";

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66/',
    headers: {
      authorization: 'f40a9f4b-0bcd-463c-8c92-98d5ed6dd089',
      'Content-Type': 'application/json'
    }
  })