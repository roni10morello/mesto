export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      userId,
      handleRemoveBtnClick,
      handleLikeCardClick,
    },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likeNumber = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleDeleteIconClick = handleRemoveBtnClick;
    this._handleLikeCardClick = handleLikeCardClick;
    this._userId = userId;
    this._isLiked = data.likes.some((like) => {
      return like._id === this._userId;
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
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

    this._likeNum = this._element.querySelector(".elements__like-counter");

    if (this._isLiked) {
      this._addLike();
    }
    this._elementNameCard.textContent = this._name;
    this._elementImgCard.src = this._link;
    this._elementImgCard.alt = this._name;
    this._likeNum.textContent = this._likeNumber;

    if (this._ownerId !== this._userId) {
      this._buttonDeleteCard.remove();
    }
    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick() {
    this._handleLikeCardClick(
      this._id,
      this._isLiked,
      this._addLike.bind(this),
      this._removeLike.bind(this),
      this._likeCounter.bind(this)
    );
  }

  _likeCounter(data) {
    this._likeArray = data.likes.length;
  }

  _addLike() {
    this._likeButton.classList.add("elements__btn-like_active");
    this._isLiked = true;
    this._likeNum.textContent = this._likeArray;
  }

  _removeLike() {
    this._likeButton.classList.remove("elements__btn-like_active");
    this._isLiked = false;
    this._likeNum.textContent = this._likeArray;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._buttonDeleteCard.addEventListener("click", () => {
      this._handleDeleteIconClick(this);
    });
    this._elementImgCard.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
