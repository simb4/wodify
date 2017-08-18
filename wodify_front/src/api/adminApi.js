import { SERVER_URL } from "../constants/server"
import { STD_HEADERS } from "../constants/constants"

import qs from "qs"

const addAthleteUrl = SERVER_URL + "main/add_athlete/"
const addComponentUrl = SERVER_URL + "main/add_component/"
const addProgramUrl = SERVER_URL + "main/add_program/"
const addSectionUrl = SERVER_URL + "main/add_section/"
const addWodUrl = SERVER_URL + "main/add_wod/"
const listAthletesUrl = SERVER_URL + "main/list_athletes/"
const listProgramsUrl = SERVER_URL + "main/list_programs/"
const listSectionsUrl = SERVER_URL + "main/list_sections/"
const listGymsUrl = SERVER_URL + "/main/list_gyms/"
const registrationUrl = SERVER_URL + "main/register/"
const getWodOfWeekUrl = SERVER_URL + "main/get_wods_of_week/"
const getWorkoutsOfWeekUrl = SERVER_URL + "main/get_workouts_of_week/"

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

export const getWodOfWeek = (token) => (
  fetch(
    getWodOfWeekUrl,
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
        'auth-token': token
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





