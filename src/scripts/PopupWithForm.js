import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".form__input"));
    this._buttonSave = this._popup.querySelector(".form__button-save");
    this._buttonSaveTextDefault = this._buttonSave.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );

    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = "Сохранение...";
    } else {
      this._buttonSave.textContent = this._buttonSaveTextDefault;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}


