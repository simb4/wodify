import * as actionTypes from '../constants/actionTypes'
import * as userApi from '../api/userApi'
import { ERRORS } from '../constants/constants';


export const updatingProfile = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_UPDATE_PROFILE_STARTED,
  })

  userApi
    .updateProfile(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_UPDATE_PROFILE_FAILED,
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
                    type: actionTypes.ACTION_UPDATE_PROFILE_SUCCESS,
                    user: responseObject.user
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_UPDATE_PROFILE_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPDATE_PROFILE_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}