import '../pages/index.css';

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
const cardForm = document.addPlace;
const nameInput = profileForm.elements.formProfileName;
const jobInput = profileForm.elements.formProfileJob;

function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function setEditFormValues(formElement, value) {
  formElement.value = value.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
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

editBtn.addEventListener('click', () => {
  setEditFormValues(nameInput, profileName);
  setEditFormValues(jobInput, profileJob);
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
profileForm.addEventListener('submit', () => {
  handleProfileFormSubmit();
  closePopup(profilePopup);
});

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

const placeTemplate = document.querySelector('#cardTemplate').content.querySelector('.element');
const placesContainer = document.querySelector('.elements');

initialCards.forEach((i) => {
  const cardObj = {
    name: i.name,
    link: i.link
  };
  const placeCard = createCard(cardObj);
  placesContainer.append(placeCard);
});

const placeForm = document.addPlace;
const placeNameInput = placeForm.elements.placeName;
const placeLinkInput = placeForm.elements.placeLink;

function createCard(cardData) {
  const placeElement = placeTemplate.cloneNode(true);
  const imageInPlaceElement = placeElement.querySelector('.element__img')
  imageInPlaceElement.src = cardData.link;
  imageInPlaceElement.alt = cardData.name;
  placeElement.querySelector('.element__text').textContent = cardData.name;
  const likeBtn = placeElement.querySelector('.element__like-btn');
  likeBtn.addEventListener('click', toggleLike);
  const deleteBtn = placeElement.querySelector('.element__delete-btn');
  deleteBtn.addEventListener('click', deleteCard);
  const imgBtn = placeElement.querySelector('.element__img');
  imgBtn.addEventListener('click', () => {
    createImagePopup(cardData);
    openPopup(imagePopup);
  });
  return placeElement;
}

function renderCard(cardData) {
  const placeCard = createCard(cardData);
  placesContainer.prepend(placeCard);
}

const imageInPopup = imagePopup.querySelector('.img-popup__img');
const titleInPopup = imagePopup.querySelector('.img-popup__name');

function createImagePopup(cardData) {
  imageInPopup.src = cardData.link;
  imageInPopup.alt = cardData.name;
  titleInPopup.textContent = cardData.name;
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardObj = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  renderCard(cardObj);
  placeForm.reset();
  closePopup(cardPopup);
}

placeForm.addEventListener('submit', handlePlaceFormSubmit);


