import { profileName, profileJob, profileNameInput, profileJobInput, closePopup } from "./utils";

function setEditFormValues(formElement, value) {
  formElement.value = value.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
}

function toggleLike(event) {
  const likeBtn = event.target;
  likeBtn.classList.toggle('element__like-btn_active');
}

function deleteCard(event) {
  const deleteBtn = event.target;
  const placeCard = deleteBtn.closest('.element');
  placeCard.remove();
}

function closePopupWithEsc(evt, popup) {
  if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}

function closePopupFromOutside(evt) {
  const popupContainer = evt.target.closest('[class*="popup__container"]');
  const popup = evt.target.closest('.popup');
  if (popup && !popupContainer && popup.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}

export { setEditFormValues, handleProfileFormSubmit, toggleLike, deleteCard, closePopupWithEsc, closePopupFromOutside }
