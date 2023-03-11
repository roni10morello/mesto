import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, formsConfig } from "./utils.js";

const templateSelector = document.querySelector(".template")
.content.querySelector(".elements__item");

const initialCardsList = document.querySelector(".elements");
const elementFormAdd = document.querySelector(".form_add");
const nameImputFormAdd = document.querySelector(".form__input_form_add-name");
const linkInputFormAdd = document.querySelector(".form__input_form_add-link");

const popupFormEditBtnOpen = document.querySelector(".profile__btn-edit");
const popupFormEditContainer = document.querySelector(".popup_form-edit");
const popupFormEditBtnClose = document.querySelector(
  ".popup__button-close_form-edit"
);

const popupFormAddContainer = document.querySelector(".popup_form-add");
const popupFormAddBtnOpen = document.querySelector(".profile__btn-add");
const popupFormAddBtnClose = document.querySelector(
  ".popup__button-close_form-add"
);

const popupImageContainer = document.querySelector(".popup_image");
const popupImageBtnClose = document.querySelector(".popup__button-close_image");

const elementFormEdit = document.querySelector(".form_edit");
const nameInputFormEdit = document.querySelector(".form__input_form_edit-name");
const jobInputFormEdit = document.querySelector(".form__input_form_edit-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const popupImageTitle = document.querySelector(".popup__image-title");
const popupImagePic = document.querySelector(".popup__pic");

const selectAllPopup = document.querySelectorAll(".popup");
const formElement = document.querySelector(".popup__container");

const disableAddButton = document.querySelector(".form__button-save_form-add");
const enableEditButton = document.querySelector(".form__button-save_form-edit");
const closeButtons = document.querySelectorAll(".popup__button-close");

initialCards.forEach((item) => renderCard(item));

function renderCard(card) {
  initialCardsList.prepend(createCardElement(card));
}

function createCardElement(item) {
  const cardElement = new Card(
    item.name,
    item.link,
    templateSelector,
    openImagePopup
  ).generateCard();
  return cardElement;
}

const validFormEdit = new FormValidator(formsConfig, popupFormEditContainer);
validFormEdit.enableValidation();

const validFormAdd = new FormValidator(formsConfig, popupFormAddContainer);
validFormAdd.enableValidation();

function submitHandleFormAdd(evt) {
  evt.preventDefault();
  const nameFormAdd = nameImputFormAdd.value;
  const linkFormAdd = linkInputFormAdd.value;

  renderCard({ name: nameFormAdd, link: linkFormAdd });
  evt.target.reset();
  closePopup(popupFormAddContainer);
}

function submitHandleFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputFormEdit.value;
  profileJob.textContent = jobInputFormEdit.value;
  closePopup(popupFormEditContainer);
}

function openImagePopup(name, link) {
  popupImageTitle.textContent = name;
  popupImagePic.src = link;
  popupImagePic.alt = name;
  openPopup(popupImageContainer);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEscapePopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEscapePopup);
}

const closeEscapePopup = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

selectAllPopup.forEach(function (popup) {
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

popupFormEditBtnOpen.addEventListener("click", function () {
  openPopup(popupFormEditContainer);
  nameInputFormEdit.value = profileName.textContent;
  jobInputFormEdit.value = profileJob.textContent;
  validFormEdit.resetValidation();
});

popupFormAddBtnOpen.addEventListener("click", function () {
  validFormAdd.resetValidation();
  openPopup(popupFormAddContainer);
  elementFormAdd.reset();
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

elementFormEdit.addEventListener("submit", submitHandleFormEdit);
elementFormAdd.addEventListener("submit", submitHandleFormAdd);
