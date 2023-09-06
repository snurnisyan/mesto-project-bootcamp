import { checkResponse } from "./utils";

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8',
  headers: {
    authorization: 'd864362b-0a66-47e9-98b6-c6a9224ad665',
    'Content-Type': 'application/json'
  }
}

function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
}

function updateProfileInfo(nameProfile, aboutProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile,
    })
  })
    .then(checkResponse)
}

function updateAvatar(ava) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: ava,
    })
  })
    .then(checkResponse)
}

function postCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then(checkResponse)
}

function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}

export { postCard, deleteCardFromServer, putLike, deleteLike, getProfile, getCards, updateProfileInfo, updateAvatar };
