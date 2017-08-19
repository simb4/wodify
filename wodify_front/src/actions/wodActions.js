import * as actionTypes from '../constants/actionTypes'
import * as adminApi from '../api/adminApi'
import { ERRORS } from '../constants/constants';

export const getSections = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_SECTIONS_STARTED,
  })

  adminApi
    .getSections(getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_SECTIONS_FAILED,
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
                  type: actionTypes.ACTION_GET_SECTIONS_SUCCESS,
                  sections: responseObject.sections
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_SECTIONS_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_SECTIONS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const getComponents = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_COMPONENTS_STARTED,
  })

  adminApi
    .getComponents(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_COMPONENTS_FAILED,
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
                  type: actionTypes.ACTION_GET_COMPONENTS_SUCCESS,
                  components: responseObject.components
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_COMPONENTS_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_COMPONENTS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}






