import { SERVER_URL } from "../constants/server"
import * as API from './defaultApi'

const getWorkoutsUrl = SERVER_URL + "moderators/trainings/"
const getCoachesUrl = SERVER_URL + "moderators/coaches/"
const addWorkoutUrl = SERVER_URL + "moderators/trainings/create/"

export const getWorkouts = (token, data) => (
  API.stdApi({ method: 'POST',
    url: getWorkoutsUrl,
    token, data
  })
)

export const addWorkout = (token, data) => (
  API.stdApi({ method: 'POST',
    url: addWorkoutUrl,
    token, data
  })
)

export const getCoaches = (token, data) => (
  API.stdApi({ method: 'POST',
    url: getCoachesUrl,
    token, data
  })
)
