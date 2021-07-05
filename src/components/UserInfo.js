export default class UserInfo {
  constructor( { userInfoNameSelector, userInfoDescriptionSelector, userInfoAvatarSelector } ) {
    this._userInfoNameSelector = userInfoNameSelector;
    this._userInfoDescriptionSelector = userInfoDescriptionSelector;
    this._userInfoAvatarSelector = userInfoAvatarSelector;
    this._userName = document.querySelector(this._userInfoNameSelector);
    this._userDescription = document.querySelector(this._userInfoDescriptionSelector);
    this._userAvatar = document.querySelector(this._userInfoAvatarSelector);
  }
  getUserInfo() {
    const userInfoData = {};
    userInfoData.userName = this._userName.textContent;
    userInfoData.userDescription = this._userDescription.textContent;
    userInfoData.userAvatar = this._userAvatar.src;
    
    return userInfoData;
  }

  setUserInfo(info) {
    this._userName.textContent = info.name;
    this._userDescription.textContent = info.about;
    this._userAvatar.src = info.avatar;
  }

  updateAvatar(info) {
    this._userAvatar.src = info.avatar;
  }
}
