import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector(".popup__image-title");
    this._image = this._popup.querySelector(".popup__pic");
  }
  open(title, image) {
    super.open();
    this._image.src = image;
    this._image.alt = title;
    this._title.textContent = title;
  }
}



