import * as actionTypes from '../constants/actionTypes'
import * as adminApi from '../api/adminApi'
import { ERRORS } from '../constants/constants'

export const getAthletes = () => (dispatch, getState) => {

	dispatch({
		type: actionTypes.ACTION_GET_ATHLETES_STARTED,
	})

	adminApi
		.getAthletes(getState().user.token)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_GET_ATHLETES_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
				} else {
					response
					.text()
					.then(
						value => {
							const responseObject = JSON.parse(value)
							if(responseObject.code === 0){
								dispatch({
									type: actionTypes.ACTION_GET_ATHLETES_SUCCESS,
									athletes: responseObject.athletes
								})
							} else{
								dispatch({
									type: actionTypes.ACTION_GET_ATHLETES_FAILED,
									errorMessage: responseObject.message
								})
							}
						}
					)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_GET_ATHLETES_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
			}
		)
}

export const addWod = (data) => (dispatch, getState) => {

	dispatch({
		type: actionTypes.ACTION_ADD_WOD_STARTED,
	})

	adminApi
		.addWod(getState().user.token, data)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_ADD_WOD_FAILED,
						errorMessage: ERRORS.NUMBER + response.status
					})
				} else {
					response
						.text()
						.then(
							value => {
								const responseObject = JSON.parse(value)
								if(responseObject.code === 0){
									dispatch({
										type: actionTypes.ACTION_ADD_WOD_SUCCESS,
										wod: responseObject.result,
									})
								} else {
									dispatch({
										type: actionTypes.ACTION_ADD_WOD_FAILED,
										errorMessage: responseObject.message,
									})
								}
							}
						)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_ADD_WOD_FAILED,
					errorMessage: ERRORS.NO_INTERNET
				})
			}
		)
}

export const addAthlete = (data) => (dispatch, getState) => {

	dispatch({
		type: actionTypes.ACTION_ADD_ATHLETE_STARTED,
	})

	adminApi
		.addAthlete(getState().user.token, data)
		.then(
			response => {
				if(response.status !== 200) {
					dispatch({
						type: actionTypes.ACTION_ADD_ATHLETE_FAILED,
						errorMessage: ERRORS.NUMBER + response.status,
					})
				} else {
					response
						.text()
						.then(
							value => {
								const responseObject = JSON.parse(value)
								if(responseObject.code === 0){
									dispatch({
										type: actionTypes.ACTION_ADD_ATHLETE_SUCCESS,
										athlete: responseObject.result,
									})
								} else {
									dispatch({
										type: actionTypes.ACTION_ADD_ATHLETE_FAILED,
										errorMessage: responseObject.message,
									})
								}
							}
						)
				}
			},
			error => {
				dispatch({
					type: actionTypes.ACTION_ADD_ATHLETE_FAILED,
					errorMessage: ERRORS.NO_INTERNET,
				})
			}
		)
}











