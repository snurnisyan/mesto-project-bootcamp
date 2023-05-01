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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formType) => {
    setFormEventListeners(formType);
  });
};

export { showInputError, hideInputError, isValid, setFormEventListeners, enableValidation, hasInvalidInput, toggleButtonState }
