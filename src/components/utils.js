const profilePopup = document.querySelector('#edit-form');
const cardPopup = document.querySelector('#add-form');
const imagePopup = document.querySelector('#card-img');
const avatarPopup = document.querySelector('#edit-avatar-form');

const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const profileCloseBtn = profilePopup.querySelector('#edit-close-btn');
const addCloseBtn = cardPopup.querySelector('#add-close-btn');
const imgCloseBtn = imagePopup.querySelector('#img-close-btn');
const editAvatarBtn = document.querySelector('.profile__avatar-btn');
const avatarCloseBtn = avatarPopup.querySelector('#edit-avatar-close-btn');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profileAvatar = document.querySelector('.profile__avatar');
const profileForm = document.profileEdit;
const profileSubmitBtn = profileForm.querySelector('.popup__submit-btn');
const avatarForm = document.editAvatar;
const avatarSubmitBtn = avatarForm.querySelector('.popup__submit-btn');
const profileNameInput = profileForm.elements.formProfileName;
const profileJobInput = profileForm.elements.formProfileJob;
const avatarInput = avatarForm.elements.avatarLink;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function renderLoading(submitButton, text) {
  submitButton.textContent = text;
}


export { profilePopup, cardPopup, imagePopup, editBtn, addBtn, profileCloseBtn, addCloseBtn, imgCloseBtn, profileName, profileJob,
  profileAvatar, profileForm, profileNameInput, profileJobInput, avatarPopup, editAvatarBtn, avatarCloseBtn, avatarInput, avatarForm,
  profileSubmitBtn, avatarSubmitBtn, checkResponse, renderLoading }
