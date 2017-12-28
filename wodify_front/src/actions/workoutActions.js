import * as actionTypes from '../constants/actionTypes'
import * as workoutApi from '../api/workoutApi'
import { defaultAction } from './defaultActions';

export const refresh = () => (dispatch, getState)  => {
  dispatch({
    type: actionTypes.ACTOIN_REFRESH_STARTED,
  })
}

export const getWorkouts = (data) => (dispatch, getState) => {
  defaultAction(dispatch, getState, {
    action: actionTypes.ACTION_GET_WORKOUTS,
    apiCall: () => { return workoutApi.getWorkouts(getState().user.token, data) },
    onSuccess: (response) => ({ workouts: response.trainings }),
    onFailure: (response) => ({ errorMessage: response.message }),
  })
}

export const addWorkout = (data) => (dispatch, getState) => {
  defaultAction(dispatch, getState, {
    action: actionTypes.ACTION_ADD_WORKOUT,
    apiCall: () => { return workoutApi.addWorkout(getState().user.token, data) },
    onSuccess: (response) => ({ workout: response.training }),
    onFailure: (response) => ({ errorMessage: response.message }),
  })
}

export const updateWorkout = (data) => (dispatch, getState) => {
  defaultAction(dispatch, getState, {
    action: actionTypes.ACTION_UPDATE_WORKOUT,
    apiCall: () => { return workoutApi.updateWorkout(getState().user.token, data) },
    onSuccess: (response) => ({ workout: response.training }),
    onFailure: (response) => ({ errorMessage: response.message }),
  })
}

export const deleteWorkout = (data) => (dispatch, getState) => {
  defaultAction(dispatch, getState, {
    action: actionTypes.ACTION_DELETE_WORKOUT,
    apiCall: () => { return workoutApi.deleteWorkout(getState().user.token, data) },
    onSuccess: (response) => ({ id: data.training_id }),
    onFailure: (response) => ({ errorMessage: response.message }),
  })
}


export const getCoaches = (data) => (dispatch, getState) => {
  defaultAction(dispatch, getState, {
    action: actionTypes.ACTION_GET_COACHES,
    apiCall: () => { return workoutApi.getCoaches(getState().user.token, data) },
    onSuccess: (response) => ({ coaches: response.coaches }),
    onFailure: (response) => ({ errorMessage: response.message }),
  })
}