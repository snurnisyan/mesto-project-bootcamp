import { imagePopup, cardPopup, openPopup, closePopup } from './utils';
import { toggleLike, deleteCard } from './modal';

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
const placeForm = document.addPlace;
const placeNameInput = placeForm.elements.placeName;
const placeLinkInput = placeForm.elements.placeLink;
const imageInPopup = imagePopup.querySelector('.img-popup__img');
const titleInPopup = imagePopup.querySelector('.img-popup__name');

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

export { initialCards, placesContainer, placeForm, placeNameInput, placeLinkInput, createCard, handlePlaceFormSubmit }
