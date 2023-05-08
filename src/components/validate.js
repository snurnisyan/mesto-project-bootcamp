const showInputError = (formElement, formInput, settings) => {
  const inputError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  inputError.textContent = formInput.validationMessage;
  inputError.classList.add(settings.errorClass);
};

const hideInputError = (formElement, formInput, settings) => {
  const inputError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  inputError.classList.remove(settings.errorClass);
  inputError.textContent = '';
};

const isValid = (formElement, formInput, settings) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, settings);
  } else {
    hideInputError(formElement, formInput, settings);
  }
};

const setFormEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  toggleButtonState(formElement, inputList, settings);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, settings);
      toggleButtonState(formElement, inputList, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  })
};

const toggleButtonState = (formElement, inputList, settings) => {
  const formSubmitButton = formElement.querySelector(settings.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    formSubmitButton.classList.add(settings.inactiveButtonClass);
  } else {
    formSubmitButton.classList.remove(settings.inactiveButtonClass);
  }
};

const enableValidationBtn = (formElement, settings) => {
  const formSubmitButton = formElement.querySelector(settings.submitButtonSelector);
  formSubmitButton.addEventListener('click', (evt) => {
    if (formSubmitButton.classList.contains(settings.inactiveButtonClass)) {
      evt.preventDefault();
    }
  })
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setFormEventListeners(formElement, settings);
    enableValidationBtn(formElement, settings);
  });
}

export { showInputError, hideInputError, isValid, setFormEventListeners, enableValidation, hasInvalidInput, toggleButtonState }


