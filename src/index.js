import '../pages/index.css';

import { editBtn, profileNameInput, profileName, profileJobInput, profileJob, profilePopup, cardPopup, imagePopup,
  profileCloseBtn, addBtn, addCloseBtn, imgCloseBtn, profileForm } from './components/utils';
import { placeForm, placesContainer, initialCards, createCard, handlePlaceFormSubmit } from './components/card';
import { closePopupFromOutside, openPopup, closePopup } from "./components/modal";
import { enableValidation } from "./components/validate";

function setEditFormValues(formElement, value) {
  formElement.value = value.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
}

initialCards.forEach((i) => {
  const cardObj = {
    name: i.name,
    link: i.link
  };
  const placeCard = createCard(cardObj);
  placesContainer.append(placeCard);
});

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
profileForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profilePopup);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

profilePopup.addEventListener('mousedown', closePopupFromOutside);
cardPopup.addEventListener('mousedown', closePopupFromOutside);
imagePopup.addEventListener('mousedown', closePopupFromOutside);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__form-field_type_error',
  errorClass: 'popup__span-message_active'
});
