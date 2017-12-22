import { SERVER_URL } from "../constants/server"
import * as API from './defaultApi'

const getWorkoutsUrl = SERVER_URL + "moderators/trainings/"

export const getWorkouts = (token, data) => (
  API.stdApi({ method: 'POST',
    url: getWorkoutsUrl,
    token, data
  })
)
