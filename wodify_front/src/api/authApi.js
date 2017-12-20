import { SERVER_URL } from '../constants/server';
import { STD_HEADERS } from '../constants/constants';
import qs from 'qs'

const loginUrl = SERVER_URL + "auth/login/";
const resetPasswordUrl = SERVER_URL + "auth/reset_password/"
const setPasswordUrl = SERVER_URL + 'auth/set_password_by_code/'
const logOutUrl = SERVER_URL + "auth/logout"

export const login = (data) => (
  fetch(
    loginUrl,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: qs.stringify(data)
    }
  )
)

export const resetPassword = (data) => (
  fetch(
    resetPasswordUrl,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: qs.stringify(data)
    }
  )
)

export const setPassword = (data) => (
  fetch(
    setPasswordUrl,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: qs.stringify(data)
    }
  )
)

export const logout = (token) => (
  fetch(
    logOutUrl,
    {
      method: 'POST',
      headers: { 
        ...STD_HEADERS,
        'auth-token': token,
      }
    }
  )
)
