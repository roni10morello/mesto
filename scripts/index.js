const popupBtnOpen = document.querySelector(".profile__btn-edit");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__button-close")

let formElement = document.querySelector(".form");
let nameInput = document.querySelector("#form-name");
let jobInput = document.querySelector("#form-job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

popupBtnOpen.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);

function openPopup() {
  popupContainer.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popupContainer.classList.remove("popup_opened");
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
