const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement =
  formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formsConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement =
  formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = '';
};

const disableButton = (buttonElement) => {
  buttonElement.classList.add(formsConfig.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
};

const enableButton = (buttonElement) => {
  buttonElement.classList.remove(formsConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'disabled');

};

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
    const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
  };


  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement);
    } else {
      enableButton(buttonElement);

    }
  };

  const enableValidation = (formsConfig) => {
    const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formElement);
    });
  };

  enableValidation(formsConfig);


