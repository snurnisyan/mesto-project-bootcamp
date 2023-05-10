import { renderCard } from "./card";
import { createProfileInfo } from "../index"

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8',
  headers: {
    authorization: 'd864362b-0a66-47e9-98b6-c6a9224ad665',
    'Content-Type': 'application/json'
  }
}
let userId = '';
function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      createProfileInfo(result);
      userId = result._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      result.reverse();
      result.forEach(card => {
        renderCard(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
    .catch((err) => {
      console.log(err);
    });
}

function updateAvatar(ava) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: ava,
    })
  })
    .catch((err) => {
      console.log(err);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => {
      renderCard(card);
    })
    .catch(err => {
      console.log(err);
    });
}


function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { userId, postCard, deleteCardFromServer, putLike, deleteLike, getProfile, getCards, updateProfileInfo, updateAvatar };
