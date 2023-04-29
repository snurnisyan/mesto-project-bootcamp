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
const profileNameInput = profileForm.elements.formProfileName;
const profileJobInput = profileForm.elements.formProfileJob;

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

const showInputError = (formType, formInput, errorMessage) => {
  const inputError = formType.querySelector(`.${formInput.id}-error`);
  formInput.classList.add('popup__form-field_type_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('popup__span-message_active');
};

const hideInputError = (formType, formInput) => {
  const inputError = formType.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__form-field_type_error');
  inputError.classList.remove('popup__span-message_active');
  inputError.textContent = '';
};

const isValid = (formType, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formType, formInput, formInput.validationMessage);
  } else {
    hideInputError(formType, formInput);
  }
};


const setFormEventListeners = (formType) => {
  const inputList = Array.from(formType.querySelectorAll('.popup__form-field'));
  const formSubmitButton = formType.querySelector('.popup__submit-btn');
  toggleButtonState(inputList, formSubmitButton);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formType, formInput);
      toggleButtonState(inputList, formSubmitButton);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formType) => {
    setFormEventListeners(formType);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

const toggleButtonState = (inputList, formSubmitButton) => {
  if (hasInvalidInput(inputList)) {
    formSubmitButton.classList.add('popup__submit-btn_inactive');
  } else {
    formSubmitButton.classList.remove('popup__submit-btn_inactive');
  }
};

enableValidation();
