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

const wodReducer = combineReducers({
    getSections,
    getComponents,
});

export default wodReducer