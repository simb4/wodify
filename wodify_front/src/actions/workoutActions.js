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
