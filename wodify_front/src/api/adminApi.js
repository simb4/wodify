import { SERVER_URL } from "../constants/server"
import { STD_HEADERS } from "../constants/constants"
import { transformRequest } from '../constants/transform'

import qs from "qs"

const addAthleteUrl = SERVER_URL + "main/add_athlete/"
const addComponentUrl = SERVER_URL + "main/add_component/"
const addProgramUrl = SERVER_URL + "main/add_program/"
const addSectionUrl = SERVER_URL + "main/add_section/"
const addWorkoutUrl = SERVER_URL + "main/add_workout/"
const addWorkoutToDictUrl = SERVER_URL + "main/add_workout_to_dict/"
const addWodUrl = SERVER_URL + "main/add_wod/"
const fillWodUrl = SERVER_URL + "main/fill_wod/"
const listAthletesUrl = SERVER_URL + "main/list_athletes/"
const listProgramsUrl = SERVER_URL + "main/list_programs/"
const listConstructorUrl = SERVER_URL + "main/list_constructors/"
const listSectionsUrl = SERVER_URL + "main/list_sections/"
const listGymsUrl = SERVER_URL + "main/list_gyms/"
const registrationUrl = SERVER_URL + "main/register/"
const getWodOfWeekUrl = SERVER_URL + "main/get_wods_of_week/"
const getWorkoutsOfWeekUrl = SERVER_URL + "main/get_workouts_of_week/"
const workoutsFromDictUrl = SERVER_URL + "main/get_workouts_from_dict/"
const listCoachesUrl = SERVER_URL + "main/list_coaches/"
const listComponentsUrl = SERVER_URL + "main/list_components/"
const updateWorkoutUrl = SERVER_URL + "main/update_workout/"
const updateWorkoutInDictUrl = SERVER_URL + "main/update_workout_in_dict/"
const getScoresByConstructorUrl = SERVER_URL + "main/get_scores_by_constructor/"
const deleteWorkoutUrl = SERVER_URL + "main/delete_workout/"
const deleteWorkoutFromDictUrl = SERVER_URL + "main/delete_workout_from_dict/"
const signForWorkoutUrl = SERVER_URL + "main/sign_for_workout/"
const uploadCSVUrl = SERVER_URL + "athlete/add_measure_info/"

export const uploadCSV = (token, data) => (
  fetch(
    uploadCSVUrl,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        "auth-token": token,
      },
      body: data
    }
  )
)

export const listConstructor = (token) => (
  fetch(
    listConstructorUrl,
    {
      method: 'GET',
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      }
    }
  )
)

export const deleteWorkout = (token, data) => (
  fetch(
    deleteWorkoutUrl,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data)
    }
  )
)

export const signForWorkout = (token, data) => (
  fetch(
    signForWorkoutUrl,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data)
    }
  )
)

export const deleteWorkoutFromDict = (token, data) => (
  fetch(
    deleteWorkoutFromDictUrl,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data)
    }
  )
)

export const getScoresById = (token, data) => (
  fetch(
    getScoresByConstructorUrl,
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

export const getWorkoutsOfWeek = (token, data) => (
  fetch(
    getWorkoutsOfWeekUrl,
    {
      method: 'POST', 
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data)
    }
  )
)

export const getWorkoutsFromDict = (token) => (
  fetch(
    workoutsFromDictUrl,
    {
      method: 'GET', 
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
    }
  )
)

export const updateWorkout = (token, data) => (
  fetch(
    updateWorkoutUrl,
    {
      method: 'POST', 
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data, {skipNulls: true})
    }
  )
)

export const updateWorkoutInDict = (token, data) => (
  fetch(
    updateWorkoutInDictUrl,
    {
      method: 'POST', 
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data, {skipNulls: true})
    }
  )
)

export const fillWod = (token, data) => (
  fetch(
    fillWodUrl,
    {
      method: 'POST', 
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: transformRequest(data)
    }
  )
);

export const getWodOfWeek = (token, data) => (
  fetch(
    getWodOfWeekUrl,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
      },
      body: qs.stringify(data)
    }
  )
)

export const getCoaches = (token) => (
  fetch(
    listCoachesUrl,
     {
      method: 'GET',
      headers: {
        ...STD_HEADERS,
        "auth-token": token,
     }
   }
  )
)

export const register = (token, data) => (
  fetch(
    registrationUrl,
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

export const addAthlete = (token, data) => (
	fetch(
		addAthleteUrl,
		{
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
	)
)

export const addWorkout = (token, data) => (
  fetch(
    addWorkoutUrl,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
  )
)

export const addWorkoutToDict = (token, data) => (
  fetch(
    addWorkoutToDictUrl,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
  )
)

export const addComponent = (token, data) => (
	fetch(
		addComponentUrl,
		{
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
	)
)

export const addProgram = (token, data) => (
	fetch(
		addProgramUrl,
		{
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
	)
)

export const addSection = (token, data) => (
	fetch(
		addSectionUrl,
		{
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
	)
)

export const addWod = (token, data) => (
	fetch(
		addWodUrl,
		{
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'auth-token': token,
      },
      body: qs.stringify(data)
    }
	)
)

export const getAthletes = (token) => (
	fetch(
		listAthletesUrl,
		{
			method: "GET",
			headers: {
				...STD_HEADERS,
				'Auth-token': token
			}
		}
	)
)

export const getGyms = (token) => (
  fetch(
    listGymsUrl,
    {
      method: "GET",
      headers: {
        ...STD_HEADERS,
        'Auth-token': token
      }
    }
  )
)


export const getPrograms = (token) => (
	fetch(
		listProgramsUrl,
		{
			method: "GET",
			headers: {
				...STD_HEADERS,
				'auth-token': token
			}
		}
	)
)

export const getSections = (token) => (
	fetch(
		listSectionsUrl,
		{
			method: "GET",
			headers: {
				...STD_HEADERS,
				'auth-token': token
			}
		}
	)
)

export const getComponents = (token) => (
  fetch(
    listComponentsUrl,
    {
      method: "GET",
      headers: {
        ...STD_HEADERS,
        'auth-token': token
      },
    }
  )
)





