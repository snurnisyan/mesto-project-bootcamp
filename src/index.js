import '../pages/index.css';

function openPopup(popupId) {
  return () => {
    let popup = document.querySelector(popupId);
    popup.classList.add('popup_opened');
  };
}

function closePopup(event) {
  const closeBtn = event.target;
  const formPopup = closeBtn.closest(".popup");
  formPopup.classList.remove('popup_opened');
}

const editBtn = document.querySelector('.profile__edit-btn');
editBtn.addEventListener('click', openPopup('#edit-form'));

let popupCloseBtn = document.querySelector('#edit-close-btn');
popupCloseBtn.addEventListener('click', closePopup);

const addBtn = document.querySelector('.profile__add-btn');
addBtn.addEventListener('click', openPopup('#add-form'));

popupCloseBtn = document.querySelector('#add-close-btn');
popupCloseBtn.addEventListener('click', closePopup);

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function setDefaultValues(field, i) {
  let formField = document.querySelectorAll('.popup__form-field')[i];
  formField.value = field.textContent;
}
setDefaultValues(profileName, 0);
setDefaultValues(profileJob, 1);

const formElement = document.querySelector('[name="profile-edit"]');
const nameInput = formElement.querySelector('[name="profile-name"]');
const jobInput = formElement.querySelector('[name="profile-job"]');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', closePopup);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const placesTemplate = document.querySelector('template').content;
const places = document.querySelector('.elements');

for (let i = initialCards.length - 1; i >= 0; i--) {
  createCard(initialCards[i].link, initialCards[i].name);
}

const placeFormElement = document.querySelector('[name="add-place"]');
const placeNameInput = placeFormElement.querySelector('[name="place-name"]');
const placeLinkInput = placeFormElement.querySelector('[name="place-link"]');

function createCard(link, name) {
  const placeElement = placesTemplate.querySelector('.element').cloneNode(true);
  placeElement.querySelector('.element__img').src = link;
  placeElement.querySelector('.element__img').alt = name;
  placeElement.querySelector('.element__text').textContent = name;
  const likeBtn = placeElement.querySelector('.element__like-btn');
  likeBtn.addEventListener('click', toggleLike);
  const deleteBtn = placeElement.querySelector('.element__delete-btn');
  deleteBtn.addEventListener('click', deleteCard);
  const imgBtn = placeElement.querySelector('.element__img');
  imgBtn.addEventListener('click', imgPopup(link, name));
  imgBtn.addEventListener('click', openPopup('#card-img'));
  places.prepend(placeElement);
}

function imgPopup(link, name) {
  return () => {
    const placePopup = document.querySelector('.img-popup');
    placePopup.querySelector('.img-popup__img').src = link;
    placePopup.querySelector('.img-popup__img').alt = name;
    placePopup.querySelector('.img-popup__name').textContent = name;
  }
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  createCard(placeLinkInput.value, placeNameInput.value);
  placeNameInput.value = '';
  placeLinkInput.value = '';
}
placeFormElement.addEventListener('submit', handlePlaceSubmit);
placeFormElement.addEventListener('submit', closePopup);

function toggleLike(event) {
  const likeBtn = event.target;
  likeBtn.classList.toggle('element__like-btn_active');
}

function deleteCard(event) {
  const deleteBtn = event.target;
  const placeCard = deleteBtn.closest('.element');
  placeCard.remove();
}

popupCloseBtn = document.querySelector('#img-close-btn');
popupCloseBtn.addEventListener('click', closePopup);

