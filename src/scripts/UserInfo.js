export default class UserInfo {
  constructor({ nameProfile, jobProfile }) {
    this.name = document.querySelector(nameProfile);
    this.job = document.querySelector(jobProfile);
  }
  getUserInfo() {
    const infoProfile = {
      name: this.name.textContent,
      job: this.job.textContent,
    };
    return infoProfile;
  }

  setUserInfo(infoProfile) {
    this.name.textContent = infoProfile.name;
    this.job.textContent = infoProfile.job;
  }
}
