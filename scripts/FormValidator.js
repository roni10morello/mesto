export default class FormValidator {
  constructor(formsConfig, formSelector) {
    this.config = formsConfig;
    this._element = formSelector;
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
  }

  _disableButton() {
    this._buttonElement.classList.add(this.config.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  _enableButton() {
    this._buttonElement.classList.remove(this.config.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", "disabled");
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(
      this._element.querySelectorAll(this.config.inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      this.config.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  resetValidation = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
    this._toggleButtonState()
  }

  enableValidation = () => {
    this._setEventListeners();
  }
};
