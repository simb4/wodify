import { SERVER_URL } from '../constants/server';
import { STD_HEADERS } from '../constants/constants';
import qs from 'qs'

const loginUrl = SERVER_URL + "main/login/";
const loginCheckUrl = SERVER_URL + "main/login/check/";
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
