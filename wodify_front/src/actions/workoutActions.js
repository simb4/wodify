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




