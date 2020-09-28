import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import { API_URL } from '../.env';

const service = LocalStorageService.getService();

export default class AuthService {
  static async makeRegister({ email, password }) {
    try {
      await axios.post(`${API_URL}/api/auth/register`, 
        { email, password }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  static async makeLogin({ email, password }) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, 
        { email, password }
      );
      _setAuthData({
        accessToken: response.data.token,
        exp: _parseTokenData(response.data.token).exp
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  static isAccesTokenExpired() {
    const exp = service.getAccessTokenExpDate();
    const nowTime = Math.floor(new Date().getTime() / 1000);
    const reserve = 10;   // Запас времени на отправку сетевого запроса

    // Проверка на null
    if (!exp) {
      return true;
    }

    if (exp - reserve <= nowTime) {
      service.clearAuthData();
    }

    return exp - reserve <= nowTime;
  }
  
}

/**
********************
* Приватные методы
********************
*/

function _parseTokenData(accessToken) {
  let payload = '';
  let tokenData = {};

  try {
    payload = accessToken.split('.')[1];
    tokenData = JSON.parse(atob(payload));
  } catch (error) {
    throw new Error(error);
  }

  return tokenData;
}

function _setAuthData ({ accessToken, exp } = {}) {
  service.setAuthData({ accessToken, accessTokenExpDate: exp });
}