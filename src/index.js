import './pages/index.css';

import { editBtn, profileNameInput, profileName, profileJobInput, profileJob, profileAvatar, profilePopup, cardPopup, imagePopup,
  profileCloseBtn, addBtn, addCloseBtn, imgCloseBtn, profileForm, avatarPopup, editAvatarBtn, avatarCloseBtn, avatarInput, avatarForm,
  profileSubmitBtn, avatarSubmitBtn } from './components/utils';
import { placeForm, handlePlaceFormSubmit } from './components/card';
import { closePopupFromOutside, openPopup, closePopup } from './components/modal';
import { enableValidation } from './components/validate';
import { getProfile, getCards, updateProfileInfo, updateAvatar } from './components/api'

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

export function renderLoading(submitButton, text) {
  submitButton.textContent = text;
}
export function createProfileInfo(profileObj) {
  profileName.textContent = profileObj.name;
  profileJob.textContent = profileObj.about;
  profileAvatar.src = profileObj.avatar;
}

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

getProfile()
  .then(getCards);


