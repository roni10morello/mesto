const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80/'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1573156667506-115190c68737?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Алания',
    link: 'https://images.unsplash.com/photo-1612719734820-81784b7e6573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Сахалин',
    link: 'https://images.unsplash.com/photo-1661680390126-ed81efd300b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  },
  {
    name: 'Дербент',
    link: 'https://images.unsplash.com/photo-1625780248192-cfdc2d61a996?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1620315431189-2bd22e95d97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  }
];

const cardTemplate = document
  .querySelector(".template")
  .content.querySelector(".elements__item");

const cardList = document.querySelector(".elements");
const formAddElement = document.querySelector(".form-add");
const inputNameFormAdd = document.querySelector(".form__input_form_add-name");
const inputLinkFormAdd = document.querySelector(".form__input_form_add-link");

const popupEditBtnOpen = document.querySelector(".profile__btn-edit");
const popupFormEditContainer = document.querySelector(".popup_form-edit");
const popupEditBtnClose = document.querySelector(".popup__button-close_form-edit")

const popupFormAddContainer = document.querySelector(".popup_form-add");
const popupAddBtnOpen = document.querySelector(".profile__btn-add");
const popupAddBtnClose = document.querySelector(".popup__button-close_form-add")

const popupImageContainer = document.querySelector(".popup_image");
const popupImageBtnClose = document.querySelector(".popup__button-close_image");

let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".form__input_form_edit-name");
let jobInput = document.querySelector(".form__input_form_edit-job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let popupImageTitle =  document.querySelector(".popup__image-title");
let popupImagePic = document.querySelector(".popup__pic");

renderCards();

function renderCards() {
  const imgCards = initialCards.map((item) => {

    return createCard(item);
  });
  cardList.append(...imgCards);
}

function handleFormAddSubmit (evt) {
  evt.preventDefault();
  const nameFormAdd = inputNameFormAdd.value;
  const linkFormAdd = inputLinkFormAdd.value;
  const imgCard = createCard({name: nameFormAdd, link: linkFormAdd });

  cardList.append(imgCard);
  evt.target.reset();
  closePopupAddForm();
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupEditForm();
}

function createCard(item) {
  const imgCard = cardTemplate.cloneNode(true);
  imgCard.querySelector(".elements__place").textContent = item.name;
  imgCard.querySelector(".elements__image").src = item.link;
  imgCard.querySelector(".elements__image").alt = item.name;

  imgCard.querySelector(".elements__btn-delete").addEventListener("click", () => {
    imgCard.remove();
  });

  const likeCardBtn = imgCard.querySelector(".elements__btn-like");
  imgCard.querySelector(".elements__btn-like").addEventListener("click", () => {
    likeCardBtn.classList.toggle("elements__btn-like_active");
  });

  imgCard.querySelector(".elements__image").addEventListener("click", () => {
    popupImageContainer.classList.add("popup_opened");

    popupImageTitle.textContent = item.name;
    popupImagePic.src = item.link;
    popupImagePic.alt = item.name;
  });

  return imgCard;
}

function closeImagePopup() {
  popupImageContainer.classList.remove("popup_opened");
}

function openPopupAddFrom() {
  popupFormAddContainer.classList.add("popup_opened");
}

function closePopupAddForm() {
  popupFormAddContainer.classList.remove("popup_opened");
  inputNameFormAdd.value = "";
  inputLinkFormAdd.value = "";
}

function openPopupEditForm() {
  popupFormEditContainer.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function closePopupEditForm() {
  popupFormEditContainer.classList.remove("popup_opened");
}

popupEditBtnOpen.addEventListener("click", openPopupEditForm);
popupAddBtnOpen.addEventListener("click", openPopupAddFrom);

popupEditBtnClose.addEventListener("click", closePopupEditForm);
popupAddBtnClose.addEventListener("click", closePopupAddForm);

formElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit', handleFormAddSubmit);

popupImageBtnClose.addEventListener("click", closeImagePopup);
