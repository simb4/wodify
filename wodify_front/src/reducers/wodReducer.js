import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const getSections = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_SECTIONS_SUCCESS:
      return action.sections
    case actionTypes.ACTION_GET_SECTIONS_STARTED:
    case actionTypes.ACTION_GET_SECTIONS_FAILED:
      return []
    default: 
      return state
  }
}

const getComponents = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_COMPONENTS_SUCCESS:
      return action.components
    case actionTypes.ACTION_GET_COMPONENTS_STARTED:
    case actionTypes.ACTION_GET_COMPONENTS_FAILED:
      return []
    default: 
      return state
  }
}

const sections = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_CREATE_SECTION_STARTED:
    case actionTypes.ACTION_CREATE_SECTION_FAILED:
      return []
    case actionTypes.ACTION_CREATE_SECTION_SUCCESS:
      return action.sections
    default:
      return state
  }
}

const components = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_ADD_COMPONENT_STARTED:
    case actionTypes.ACTION_ADD_COMPONENT_FAILED:
      return []
    case actionTypes.ACTION_ADD_COMPONENT_SUCCESS:
      return action.components
    default:
      return state
  }
}

const wodReducer = combineReducers({
    getSections,
    getComponents,
    sections,
    components
});

export default wodReducer