import { imagePopup, cardPopup } from './utils';
import { openPopup, closePopup } from './modal';
import { renderLoading } from '../index';
import { postCard, deleteCardFromServer, putLike, deleteLike, userId } from './api'

/*const initialCards = [
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
];*/

const placeTemplate = document.querySelector('#cardTemplate').content.querySelector('.element');
const placesContainer = document.querySelector('.elements');
const placeForm = document.addPlace;

const placeSubmitBtn = placeForm.querySelector('.popup__submit-btn');
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
  placeElement.id = cardData._id;
  const likeBtn = placeElement.querySelector('.element__like-btn');
  likeBtn.addEventListener('click', toggleLike);
  setLikes(cardData, likeBtn, likeBtn.nextElementSibling)
  const deleteBtn = placeElement.querySelector('.element__delete-btn');
  if (cardData.owner._id !== userId) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener('click', deleteCard);
  }
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

function toggleLike(event) {
  const likeBtn = event.target;
  let likeCounter = likeBtn.nextElementSibling;
  likeBtn.classList.toggle('element__like-btn_active');
  if (likeBtn.classList.contains('element__like-btn_active')) {
    putLike(likeBtn.closest('.element').id)
      .then ((res) => {
        likeCounter.textContent = res.likes.length;
      })
  } else {
    deleteLike(likeBtn.closest('.element').id)
      .then ((res) => {
        likeCounter.textContent = res.likes.length;
      })
  }
}

function setLikes(cardData, btn, counter) {
  const userIds = cardData.likes.map(user => {
    return user._id;
  })
  if (userIds.includes(userId)) {
    btn.classList.add('element__like-btn_active');
    counter.textContent = cardData.likes.length;
  }
}

function deleteCard(event) {
  const deleteBtn = event.target;
  const placeCard = deleteBtn.closest('.element');
  deleteCardFromServer(placeCard.id)
    .then((res) => {
      if (res.ok) {
        placeCard.remove();
      }
    })
}

function createImagePopup(cardData) {
  imageInPopup.src = cardData.link;
  imageInPopup.alt = cardData.name;
  titleInPopup.textContent = cardData.name;
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(placeSubmitBtn, 'Создание...');
  const promisePost = postCard(placeNameInput.value, placeLinkInput.value);
  promisePost.then(() => {
    renderLoading(placeSubmitBtn, 'Создать');
  })
  placeForm.reset();
  closePopup(cardPopup);
}

export { placesContainer, placeForm, placeNameInput, placeLinkInput, placeSubmitBtn, toggleLike,
  deleteCard, createCard, renderCard, handlePlaceFormSubmit }
