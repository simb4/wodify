import { STD_HEADERS } from "../constants/constants"
// import { transformRequest } from '../constants/transform'
import qs from "qs"

export const stdApi = (options) => (
  fetch(
    options.url,
    {
      method: options.method,
      headers: {
        ...STD_HEADERS,
        "auth-token": options.token,
      },
      body: qs.stringify(options.data)
    }
  )
)