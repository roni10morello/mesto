import "./index.css";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import UserInfo from "../scripts/UserInfo.js";
import Section from "../scripts/Section.js";
import PopupDeleteCard from "../scripts/PopupDeleteCard.js";
import Api from "../scripts/Api.js";

import {
  formsConfig,
  popupFormEditBtnOpen,
  popupFormEditContainer,
  popupFormAddContainer,
  popupFormAddBtnOpen,
  nameInputFormEdit,
  jobInputFormEdit,
  popupImageContainer,
  popupDeleteCardContainer,
  popupBtnDeleteCard,
  popupEditAvatarContainer,
  popupFormAvatarBtnOpen,
} from "../utils/constants.js";

const options = {
  url: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    "Content-Type": "application/json",
    authorization: "2dd28070-16ec-4860-ac4e-57aea977096f",
  },
};

const api = new Api(options);
let userId = null;

Promise.all([api.getUserInfo(), api.getAllCArds()])
  .then(([user, items]) => {
    userId = user._id;
    userInfo.setUserInfo(user.name, user.about, user.avatar);
    userInfo.setUserId(user._id);
    cardList.renderItems(items);
  })
  .catch((err) => console.log(`ALLARM ${err}`));

const userInfo = new UserInfo({
  nameProfile: ".profile__name",
  jobProfile: ".profile__job",
  avatarProfile: ".profile__avatar",
});
//-------------------------------------------------------------------------//
const popupImageOpen = new PopupWithImage(popupImageContainer);
popupImageOpen.setEventListeners();

const popupFormEdit = new PopupWithForm(
  popupFormEditContainer,
  submitHandleFormEdit
);
popupFormEdit.setEventListeners();

const popupFormAddCard = new PopupWithForm(
  popupFormAddContainer,
  submitHandleFormAdd
);
popupFormAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  popupEditAvatarContainer,
  submitHandleFormAvatar
);
popupEditAvatar.setEventListeners();

const popupFormDeleteCard = new PopupDeleteCard(
  popupDeleteCardContainer,
  handleRemoveBtnClick
);
popupFormDeleteCard.setEventListeners();
//-------------------------------------------------------------------------//

const validFormEdit = new FormValidator(formsConfig, popupFormEditContainer);
validFormEdit.enableValidation();

const validFormAdd = new FormValidator(formsConfig, popupFormAddContainer);
validFormAdd.enableValidation();

const validFormAvatarEdit = new FormValidator(
  formsConfig,
  popupEditAvatarContainer
);
validFormAvatarEdit.enableValidation();
//-------------------------------------------------------------------------//

const cardList = new Section(
  {renderer: (item) => createCardElement(item, userId)},
  ".elements"
);

function createCardElement(item) {
  const userId = userInfo.getUserId();
  const cardElement = new Card(
    {
      data: item,
      handleCardClick,
      userId,
      handleRemoveBtnClick,
      handleLikeCardClick,
    },
    ".template"
  ).generateCard();

  return cardElement;
}

function handleRemoveBtnClick(card) {
  popupFormDeleteCard.open();
  popupFormDeleteCard.setSubmitAction(() => {
    popupFormDeleteCard.renderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        popupFormDeleteCard.close();
      })
      .catch((err) =>  {
        console.log(`ALLARM ${err}`)
      })
      .finally(() => {
        popupFormDeleteCard.renderLoading(false);
      });
  });
}

function submitHandleFormAdd(dataInput) {
  popupFormAddCard.renderLoading(true);
  api
    .addCard({
      name: dataInput["placename"],
      link: dataInput["link"],
    })
    .then((res) => {
      cardList.addItem(createCardElement(res));
      popupFormAddCard.close();
    })
    .catch((err) => {
      console.log(`ALLARM ${err}`);
    })
    .finally(() => {
      popupFormAddCard.renderLoading(false);
    });
}

function submitHandleFormEdit(dataInput) {
  popupFormEdit.renderLoading(true);
  api
    .updateProfile(dataInput)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupFormEdit.close();
    })
    .catch((err) => {
      console.log(`ALLARM ${err}`);
    })
    .finally(() => {
      popupFormEdit.renderLoading(false);
    });
}

function submitHandleFormAvatar(data) {
  popupEditAvatar.renderLoading(true);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      popupEditAvatar.close();
    })

    .catch((err) => {
      console.log(`ALLARM ${err}`);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

const handleCardClick = (title, image) => {
  popupImageOpen.open(title, image);
};

const handleLikeCardClick = (
  _id,
  isLiked,
  addLike,
  removeLike,
  likeCounter
) => {
  if (isLiked) {
    api
      .removeLikeCard(_id)
      .then((data) => {
        likeCounter(data);
        removeLike();
      })
      .catch((err) =>  console.log(`ALLARM ${err}`));
  } else {
    api
      .addLikeCard(_id)
      .then((data) => {
        likeCounter(data);
        addLike();
      })
      .catch((err) => console.log(err));
  }
};

//-------------------------------------------------------//
popupFormEditBtnOpen.addEventListener("click", function () {
  const profileUser = userInfo.getUserInfo();
  nameInputFormEdit.value = profileUser.name;
  jobInputFormEdit.value = profileUser.about;

  popupFormEdit.open();
  validFormEdit.resetValidation();
});

popupFormAddBtnOpen.addEventListener("click", function () {
  validFormAdd.resetValidation();
  popupFormAddCard.open();
});

popupFormAvatarBtnOpen.addEventListener("click", function () {
  validFormAvatarEdit.resetValidation();
  popupEditAvatar.open();
});

// popupBtnDeleteCard.addEventListener("click", function () {
//   popupFormDeleteCard.open();
// });
//-------------------------------------------------------//
