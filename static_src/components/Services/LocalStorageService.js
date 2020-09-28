export default class LocalStorageService {
  constructor () {
    this.instance = this;
  }

  static getService() {
    if (this.instance) {
      return this.instance;
    } return new LocalStorageService();
  }

  setAuthData(tokenInfo) {
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
  }

  getAccessToken() {
    const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    return tokenInfo ? tokenInfo.accessToken : null;
  }

  getAccessTokenExpDate() {
    const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    return tokenInfo ? tokenInfo.accessTokenExpDate : null;
  }

  clearAuthData() {
    localStorage.removeItem('tokenInfo');
  }
}