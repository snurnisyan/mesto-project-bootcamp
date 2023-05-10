import '../pages/index.css';

import { editBtn, profileNameInput, profileName, profileJobInput, profileJob, profileAvatar, profilePopup, cardPopup, imagePopup,
  profileCloseBtn, addBtn, addCloseBtn, imgCloseBtn, profileForm, avatarPopup, editAvatarBtn, avatarCloseBtn, avatarInput, avatarForm,
  profileSubmitBtn, avatarSubmitBtn } from './components/utils';
import {
  placeForm,
  placesContainer,
  initialCards,
  createCard,
  handlePlaceFormSubmit,
  renderCard,
  placeSubmitBtn,
  placeNameInput, placeLinkInput
} from './components/card';
import { closePopupFromOutside, openPopup, closePopup } from "./components/modal";
import { enableValidation } from "./components/validate";

function setEditFormValues(formElement, value) {
  formElement.value = value.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  renderLoading(profileSubmitBtn, 'Сохранение...');
  const promisePost = updateProfileInfo(profileNameInput.value, profileJobInput.value);
  promisePost.then(() => {
    renderLoading(profileSubmitBtn, 'Сохранить');
  })
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  profileAvatar.src = avatarInput.value;
  renderLoading(avatarSubmitBtn, 'Сохранение...');
  const promisePost = updateAvatar(avatarInput.value);
  promisePost.then(() => {
    renderLoading(avatarSubmitBtn, 'Сохранить');
  })
}

/*initialCards.forEach((i) => {
  const cardObj = {
    name: i.name,
    link: i.link
  };
  const placeCard = createCard(cardObj);
  placesContainer.append(placeCard);
});*/

editBtn.addEventListener('click', () => {
  setEditFormValues(profileNameInput, profileName);
  setEditFormValues(profileJobInput, profileJob);
  openPopup(profilePopup);
});
profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});
addBtn.addEventListener('click', () => {
  openPopup(cardPopup);
});
addCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
});
imgCloseBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

editAvatarBtn.addEventListener('click', () => {
  openPopup(avatarPopup);
});
avatarCloseBtn.addEventListener('click', () => {
  closePopup(avatarPopup);
});

profileForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profilePopup);
});

avatarForm.addEventListener('submit', (evt) => {
  handleAvatarFormSubmit(evt);
  closePopup(avatarPopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

profilePopup.addEventListener('mousedown', closePopupFromOutside);
cardPopup.addEventListener('mousedown', closePopupFromOutside);
imagePopup.addEventListener('mousedown', closePopupFromOutside);
avatarPopup.addEventListener('mousedown', closePopupFromOutside);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-field_type_error',
  errorClass: 'popup__span-message_active'
});



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

getProfile()
  .then(getCards);

function createProfileInfo(profileObj) {
  profileName.textContent = profileObj.name;
  profileJob.textContent = profileObj.about;
  profileAvatar.src = profileObj.avatar;
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

function renderLoading(submitButton, text) {
  submitButton.textContent = text;
}

export { postCard, userId, deleteCardFromServer, putLike, deleteLike, renderLoading };
