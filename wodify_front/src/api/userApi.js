import { SERVER_URL } from '../constants/server';
import { STD_HEADERS } from '../constants/constants';
import qs from 'qs'

const updateProfileUrl = SERVER_URL + "/athlete/update_profile/"

export const updateProfile = (token, data) => (
  fetch(
    updateProfileUrl,
    {
      method: 'POST', 
      headers: {
        ...STD_HEADERS,
        "Auth-token": token,
      },
      body: qs.stringify(data)
    }
  )
)

