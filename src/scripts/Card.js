export default class Card {
  constructor({name, link}, handleCardClick, templateSelector) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".elements__item").cloneNode(true);
    return cardElement;

    // const cardElement = this._templateSelector.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImgCard = this._element.querySelector(".elements__image");
    this._buttonDeleteCard = this._element.querySelector(
      ".elements__btn-delete"
    );
    this._likeButton = this._element.querySelector(".elements__btn-like");
    this._elementNameCard = this._element.querySelector(".elements__place");

    this._elementNameCard.textContent = this._name;
    this._elementImgCard.src = this._link;
    this._elementImgCard.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeBtnClick();
    });
    this._buttonDeleteCard.addEventListener("click", () => {
      this._deleteCard();
    });
    this._elementImgCard.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeBtnClick() {
    this._likeButton.classList.toggle("elements__btn-like_active");
  }

  _deleteCard() {
    this._element.remove();
  }
}
