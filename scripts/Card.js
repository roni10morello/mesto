export default class Card {
  constructor(name, link, openImagePopup) {
    this._name = name;
    this._link = link;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".template")
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImgCard = this._element.querySelector(".elements__image");
    this._setEventListeners();

    this._element.querySelector(".elements__place").textContent = this._name;
    this._elementImgCard.src = this._link;
    this._elementImgCard.alt = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__btn-like")
      .addEventListener("click", () => {
        this._handleLikeBtnClick();
      });
    this._element
      .querySelector(".elements__btn-delete")
      .addEventListener("click", () => {
        this._element.remove();
      });
    this._elementImgCard.addEventListener("click", () => {
      this._openImagePopup(this._name, this._link);
    });
  }

  _handleLikeBtnClick() {
    this._element
      .querySelector(".elements__btn-like")
      .classList.toggle("elements__btn-like_active");
  }
}
