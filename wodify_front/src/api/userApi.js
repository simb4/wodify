import { SERVER_URL } from '../constants/server';
// import { STD_HEADERS } from '../constants/constants';
// import qs from 'qs'

const updateProfileUrl = SERVER_URL + "main/profile/update/"

export const updateProfile = (token, data) => (
  fetch(
    updateProfileUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'auth-token': token,
      },
      body: data
    }
  )
)
