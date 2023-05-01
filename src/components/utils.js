const profilePopup = document.querySelector('#edit-form');
const cardPopup = document.querySelector('#add-form');
const imagePopup = document.querySelector('#card-img');

const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const profileCloseBtn = profilePopup.querySelector('#edit-close-btn');
const addCloseBtn = cardPopup.querySelector('#add-close-btn');
const imgCloseBtn = imagePopup.querySelector('#img-close-btn');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileForm = document.profileEdit;
const profileNameInput = profileForm.elements.formProfileName;
const profileJobInput = profileForm.elements.formProfileJob;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export { profilePopup, cardPopup, imagePopup, editBtn, addBtn, profileCloseBtn, addCloseBtn, imgCloseBtn,
  profileName, profileJob, profileForm, profileNameInput, profileJobInput, openPopup, closePopup }
