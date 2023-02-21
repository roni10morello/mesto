const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement =
  formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement =
  formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const disableButton = (submitButtonSelector, config) => {
  submitButtonSelector.classList.add(config.inactiveButtonClass);
  submitButtonSelector.setAttribute('disabled', 'disabled');
};

const enableButton = (submitButtonSelector, config) => {
  submitButtonSelector.classList.remove(config.inactiveButtonClass);
  submitButtonSelector.removeAttribute('disabled', 'disabled');

};

const checkInputValidity = (formElement, inputElement, config) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
  };

  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
          });
          formElement.addEventListener('reset', () => {
            setTimeout(() => {
              toggleButtonState(inputList, buttonElement, config), 0 });
        });
      });
    };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList, config)) {
      disableButton(buttonElement, config);
    } else {
      enableButton(buttonElement, config);

    }
  };

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        setEventListeners(formElement, config);
    });
  };

  enableValidation(formsConfig);


