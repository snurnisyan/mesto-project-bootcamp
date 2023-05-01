import '../pages/index.css';

import { editBtn, profileNameInput, profileName, profileJobInput, profileJob, profilePopup, cardPopup, imagePopup,
  profileCloseBtn, addBtn, addCloseBtn, imgCloseBtn, profileForm, openPopup, closePopup } from './components/utils';
import { placeForm, placesContainer, initialCards, createCard, handlePlaceFormSubmit } from './components/card';
import {setEditFormValues, closePopupWithEsc, closePopupFromOutside, handleProfileFormSubmit } from "./components/modal";
import { enableValidation } from "./components/validate";

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

initialCards.forEach((i) => {
  const cardObj = {
    name: i.name,
    link: i.link
  };
  const placeCard = createCard(cardObj);
  placesContainer.append(placeCard);
});

placeForm.addEventListener('submit', handlePlaceFormSubmit);

enableValidation();

document.addEventListener('keydown', (evt) => {
  closePopupWithEsc(evt, profilePopup);
  closePopupWithEsc(evt, cardPopup);
  closePopupWithEsc(evt, imagePopup);
});

document.addEventListener('mousedown', closePopupFromOutside);
