import { SERVER_URL } from '../constants/server';
import { STD_HEADERS } from '../constants/constants';
import qs from 'qs'

const loginUrl = SERVER_URL + "main/login/";
const loginCheckUrl = SERVER_URL + "main/login/check/";
const resetPasswordUrl = SERVER_URL + "main/reset_password/"
const setPasswordUrl = SERVER_URL + '/main/set_password_by_code/'
// const logOut = SERVER_URL + "main/logout"

export const checkLogin = (data) => (
  fetch(
    loginCheckUrl,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: qs.stringify(data)
    }
  )
)

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

// export const logout = (token) => (
//   fetch(
//     logOut,
//     {
//       method: 'POST',
//       headers: { 
//         ...STD_HEADERS,
//         'auth-token': token,
//       }
//     }
//   )
// )
