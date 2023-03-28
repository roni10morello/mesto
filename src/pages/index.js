import "./index.css";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";

import {
  initialCards,
  formsConfig,
  templateSelector,
  nameImputFormAdd,
  linkInputFormAdd,
  popupFormEditBtnOpen,
  popupFormEditContainer,
  popupFormAddContainer,
  popupFormAddBtnOpen,
  nameInputFormEdit,
  jobInputFormEdit,
  popupImageContainer,
} from "../scripts/utils/constants.js";

const popupImageOpen = new PopupWithImage(popupImageContainer);
popupImageOpen.setEventListeners();

const handleCardClick = (title, image) => {
  popupImageOpen.open(title, image);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: createCardElement,
  },
  ".elements"
);

cardList.renderItems();

function createCardElement(item) {
  const card = new Card(
    {
      name: item.name,
      link: item.link,
    },
    templateSelector,
    handleCardClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const validFormEdit = new FormValidator(formsConfig, popupFormEditContainer);
validFormEdit.enableValidation();

const validFormAdd = new FormValidator(formsConfig, popupFormAddContainer);
validFormAdd.enableValidation();

const submitHandleFormAdd = () => {

  const cardElement = createCardElement({
    name: nameImputFormAdd.value,
    link: linkInputFormAdd.value
  });

  cardList.addItem(cardElement);
};

// const submitHandleFormAdd = (item) => {
//   const card = new Card(
//     {
//       name: item.name,
//       link: item.link,
//     },
//     templateSelector,
//     handleCardClick
//   );
//   const cardElement = card.generateCard();
//   cardList.addItem(cardElement);
//   console.log(cardElement);
// };

const popupFormAddCard = new PopupWithForm(
  popupFormAddContainer,
  submitHandleFormAdd
);
popupFormAddCard.setEventListeners();

const userInfo = new UserInfo({
  nameProfile: ".profile__name",
  jobProfile: ".profile__job",
});

const submitHandleFormEdit = (infoProfile) => {
  userInfo.setUserInfo(infoProfile);
};

const popupFormEdit = new PopupWithForm(
  popupFormEditContainer,
  submitHandleFormEdit
);
popupFormEdit.setEventListeners();

popupFormEditBtnOpen.addEventListener("click", function () {
  const profileUser = userInfo.getUserInfo();
  nameInputFormEdit.value = profileUser.name;
  jobInputFormEdit.value = profileUser.job;
  popupFormEdit.open();
  validFormEdit.resetValidation();
});

popupFormAddBtnOpen.addEventListener("click", function () {
  validFormAdd.resetValidation();
  popupFormAddCard.open();
});
