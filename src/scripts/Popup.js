export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closePopupButton = this._popup.querySelector(".popup__button-close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _closePopupOutside(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopupButton.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", (evt) => {
      this._closePopupOutside(evt);
    });
  }
}
