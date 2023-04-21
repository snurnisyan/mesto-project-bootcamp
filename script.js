function openPopup(popupId) {
  return () => {
    let popup = document.querySelector(popupId);
    popup.classList.add('popup_opened');
  };
}

let editBtn = document.querySelector('.profile__edit-btn');
editBtn.addEventListener('click', openPopup('#edit-form'));

function closePopup(popupId) {
  return () => {
    let popup = document.querySelector(popupId);
    popup.classList.remove('popup_opened');
  };
}

let popupCloseBtn = document.querySelector('#edit-close-btn');
popupCloseBtn.addEventListener('click', closePopup('#edit-form'));

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

/*function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);*/

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);


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

for (let i = 0; i < initialCards.length; i++) {
  const placeElement = placesTemplate.querySelector('.element').cloneNode(true);
  placeElement.querySelector('.element__img').src = initialCards[i].link;
  placeElement.querySelector('.element__img').alt = initialCards[i].name;
  placeElement.querySelector('.element__text').textContent = initialCards[i].name;
  places.append(placeElement);
}

let addBtn = document.querySelector('.profile__add-btn');
addBtn.addEventListener('click', openPopup('#add-form'));

popupCloseBtn = document.querySelector('#add-close-btn');
popupCloseBtn.addEventListener('click', closePopup('#add-form'));


const placeFormElement = document.querySelector('[name="add-place"]');
const placeNameInput = placeFormElement.querySelector('[name="place-name"]');
const placeLinkInput = placeFormElement.querySelector('[name="place-link"]');

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  const placeElement = placesTemplate.querySelector('.element').cloneNode(true);
  const placeName = placeElement.querySelector('.element__text');
  const placeLink = placeElement.querySelector('.element__img');
  placeName.textContent = placeNameInput.value;
  placeLink.src = placeLinkInput.value;
  placeLink.alt = placeNameInput.value;
  places.prepend(placeElement);
}
placeFormElement.addEventListener('submit', handlePlaceSubmit);
placeFormElement.addEventListener('submit', closePopup('#add-form'));
