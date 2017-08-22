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

export const clearWodCreated = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CLEAR_WOD_CREATED,
  })
}

export const createSection = (sections) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CREATE_SECTION_STARTED,
    sections: sections
  })

  try {
      const serializedSections = JSON.stringify(sections);
      localStorage.setItem('sections', serializedSections);
      dispatch({
        type: actionTypes.ACTION_CREATE_SECTION_SUCCESS,
        sections: sections
      })
    } catch (err) {
      dispatch({
        type: actionTypes.ACTION_CREATE_SECTION_FAILED,
        sections: sections
      })
    }
}

export const createComponent = (components) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_ADD_COMPONENT_STARTED,
    components: components
  })

  try {
      const serializedComponents = JSON.stringify(components);
      localStorage.setItem('components', serializedComponents);
      dispatch({
        type: actionTypes.ACTION_ADD_COMPONENT_SUCCESS,
        components: components
      })
    } catch (err) {
      dispatch({
        type: actionTypes.ACTION_ADD_COMPONENT_FAILED,
        components: components
      })
    }
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

export const fillWod = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_FILL_WOD_STARTED,
  })

  adminApi
    .fillWod(getState().user.token, data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_FILL_WOD_FAILED,
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
                  type: actionTypes.ACTION_FILL_WOD_SUCCESS,
                  wods: responseObject.wods
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_FILL_WOD_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_FILL_WOD_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}





