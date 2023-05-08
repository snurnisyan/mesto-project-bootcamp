
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closePopupFromOutside(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

export { closePopupFromOutside, openPopup, closePopup }
