import * as actionTypes from '../constants/actionTypes'
import * as adminApi from '../api/adminApi'

import { ERRORS } from '../constants/constants'

export const getWorkoutsFromDict = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_STARTED,
  })

  adminApi
    .getWorkoutsFromDict(getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_FAILED,
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
                  type: actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_SUCCESS,
                  workouts: responseObject.workouts
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}


export const deleteWorkouts = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_DELETE_WORKOUTS_STARTED,
  })

  adminApi
    .deleteWorkout(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_DELETE_WORKOUTS_FAILED,
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
                  type: actionTypes.ACTION_DELETE_WORKOUTS_SUCCESS,
                  workouts: responseObject.workouts
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_DELETE_WORKOUTS_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_DELETE_WORKOUTS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const deleteWorkoutFromDict = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_DELETE_WORKOUTS_DICT_STARTED,
  })

  adminApi
    .deleteWorkoutFromDict(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_DELETE_WORKOUTS_DICT_FAILED,
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
                  type: actionTypes.ACTION_DELETE_WORKOUTS_DICT_SUCCESS,
                  workouts: responseObject.workouts
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_DELETE_WORKOUTS_DICT_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_DELETE_WORKOUTS_DICT_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const addWorkoutToDict = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_ADD_WORKOUT_DICT_STARTED,
  })

  adminApi
    .addWorkoutToDict(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_ADD_WORKOUT_DICT_FAILED,
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
                    type: actionTypes.ACTION_ADD_WORKOUT_DICT_SUCCESS,
                    workout: responseObject,
                    // date: date,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_ADD_WORKOUT_DICT_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_ADD_WORKOUT_DICT_FAILED,
          errorMessage: ERRORS.NO_INTERNET,
        })
      }
    )
}

export const updateWorkoutInDict = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_UPDATE_WORKOUT_DICT_STARTED,
  })

  adminApi
    .updateWorkoutInDict(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_UPDATE_WORKOUT_DICT_FAILED,
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
                    type: actionTypes.ACTION_UPDATE_WORKOUT_DICT_SUCCESS,
                    workouts: responseObject,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_UPDATE_WORKOUT_DICT_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPDATE_WORKOUT_DICT_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const signForWorkout = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_SIGN_FOR_WORKOUT_STARTED,
  })

  adminApi
    .signForWorkout(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_SIGN_FOR_WORKOUT_FAILED,
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
                    type: actionTypes.ACTION_SIGN_FOR_WORKOUT_SUCCESS,
                    athletes: responseObject,
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_SIGN_FOR_WORKOUT_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_SIGN_FOR_WORKOUT_DICT_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}





