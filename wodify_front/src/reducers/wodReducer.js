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
    case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    case actionTypes.ACTION_ADD_COMPONENT_SUCCESS:
      return action.components
    default:
      return state
  }
}

const isWodFilling = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_FILL_WOD_STARTED:
    case actionTypes.ACTION_FILL_WOD_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    case actionTypes.ACTION_FILL_WOD_SUCCESS:
      return action.wods
    default:
      return state
  }
}

const isWodFilled = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_FILL_WOD_STARTED:
    case actionTypes.ACTION_FILL_WOD_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
    case actionTypes.ACTION_CLEAR_WOD_CREATED:
      return false
    case actionTypes.ACTION_FILL_WOD_SUCCESS:
      return true
    default:
      return state
  }
}

const scoring = (state = [], action) => {
  if(action.scoring)
    localStorage.setItem('scores', JSON.stringify(action.scoring))
  switch(action.type) {
    case actionTypes.ACTION_GET_SCORING_TYPES_STARTED:
    case actionTypes.ACTION_GET_SCORING_TYPES_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    case actionTypes.ACTION_GET_SCORING_TYPES_SUCCESS:
      return action.scoring
    default:
      return state
  }
}

const constructors = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_LIST_CONSTRUCTORS_STARTED:
    case actionTypes.ACTION_LIST_CONSTRUCTORS_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    case actionTypes.ACTION_LIST_CONSTRUCTORS_SUCCESS:
      return action.constructors
    default:
      return state
  }
}

const wodReducer = combineReducers({
    getSections,
    getComponents,
    sections,
    components,
    isWodFilling,
    scoring,
    constructors,
    isWodFilled
});

export default wodReducer