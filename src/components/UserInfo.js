
export default class UserInfo {
  constructor( { userInfoNameSelector, userInfoDescriptionSelector } ) {
    this._userInfoNameSelector = userInfoNameSelector;
    this._userInfoDescriptionSelector = userInfoDescriptionSelector;

    this._userName = document.querySelector(this._userInfoNameSelector);
    this._userDescription = document.querySelector(this._userInfoDescriptionSelector);
  }
  getUserInfo() {
    const userInfoData = {};
    userInfoData.userName = this._userName.textContent;
    userInfoData.userDescription = this._userDescription.textContent;
    return userInfoData;
  }

  setUserInfo(info) {
    this._userInfoData = this.getUserInfo();
    console.log(this._userInfoData);
    this._userName.textContent = info.name;
    this._userDescription.textContent = info.description;

  }
}
