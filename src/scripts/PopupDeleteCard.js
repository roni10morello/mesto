import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._buttonDeleteCard = document.querySelector(
      ".elements__btn-delete"
    );
    this._buttonSave = this._popup.querySelector(".form__button-save");
   }

   setSubmitAction(action) {
    this._handleSubmitCallback = action;
   }

   renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = "Удаление...";
    } else {
      this._buttonSave.textContent = "Да";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });

    };

}
