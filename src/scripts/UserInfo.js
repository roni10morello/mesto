export default class UserInfo {
  constructor({ nameProfile, jobProfile, avatarProfile }) {
    this.name = document.querySelector(nameProfile);
    this.about = document.querySelector(jobProfile);
    this.avatar = document.querySelector(avatarProfile);
    // this._userId = "";
  }
  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.about.textContent,
      avatar: this.avatar.src
    };
  }

  setUserInfo(name, about, avatar) {
    this.name.textContent = name;
    this.about.textContent = about;
    this.avatar.src = avatar;
    //this.avatar.src = data.avatar;

  }

  setUserId(_id) {
    this._userId = _id;
  }

  getUserId() {
    return this._userId;
  }
//   setUserAvatar(avatar) {
//     this.avatar.src = avatar;
//   }
}
