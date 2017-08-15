import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const athleteList = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_ATHLETES_SUCCESS:
      return action.athletes
    case actionTypes.ACTION_GET_ATHLETES_STARTED:
    case actionTypes.ACTION_GET_ATHLETES_FAILED:
      return []
    default:
      return state
  }
}

const isGettingAthletes = (state = false, action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_ATHLETES_STARTED:
      return true
    case actionTypes.ACTION_GET_ATHLETES_FAILED:
    case actionTypes.ACTION_GET_ATHLETES_SUCCESS:
      return false
    default:
      return state
  }
}

const programList = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_GET_PROGRAMS_SUCCESS:
      return action.programs
    case actionTypes.ACTION_GET_PROGRAMS_FAILED:
    case actionTypes.ACTION_GET_PROGRAMS_STARTED:
      return []
    default:
      return state
  }
}

const wodList = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WOD_SUCCES:
      return action.wodList
    case actionTypes.ACTION_GET_WOD_FAILED:
    case actionTypes.ACTION_GET_WOD_STARTED:
      return []
    default: 
      return state
  }
}

const creatingWod = (state = "", action) => {
  switch (action.type){
    case actionTypes.ACTION_ADD_WOD_SUCCESS:
      return "created"
    case actionTypes.ACTION_ADD_WOD_STARTED:
      return "started"
    case actionTypes.ACTION_ADD_WOD_FAILED:
      return action.errorMessage
    default: 
      return state
  }
}

const gettingWodOfWeek = (state = false, action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WEEK_WOD_STARTED:
      return true
    case actionTypes.ACTION_GET_WEEK_WOD_FAILED:
    case actionTypes.ACTION_GET_WEEK_WOD_SUCCESS:
      return false
    default:
      return state
  }
}

const isWodOfWeekGot = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WEEK_WOD_STARTED:
    case actionTypes.ACTION_GET_WEEK_WOD_FAILED: 
      return []
    case actionTypes.ACTION_GET_WEEK_WOD_SUCCESS:
      return action.wodOfWeek
    default:
      return state
  }
}

const isRegistering = (state = false, action) => {
    switch(action.type){
      case actionTypes.ACTION_REGISTRATION_STARTED:
        return true 
      case actionTypes.ACTION_REGISTRATION_SUCCESS:
      case actionTypes.ACTION_REGISTRATION_FAILED:
        return false
      default:
        return state
    }
}

const isRegistered = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_REGISTRATION_SUCCESS:
      return true
    case actionTypes.ACTION_REGISTRATION_FAILED:
    case actionTypes.ACTION_REGISTRATION_STARTED:
    case actionTypes.ACTION_CLEAR_REGISTRATION:
      return false
    default:
      return state
  }
}

const isRegisteringLoginExist = (state = false, action) => {
  switch(action.type){
    case actionTypes.ACTION_CHECK_ACCOUNT_NOTEXIST:
      return true
    case actionTypes.ACTION_CHECK_ACCOUNT_EXISTS:
    case actionTypes.ACTION_CHECK_ACCOUNT_STARTED:
    case actionTypes.ACTION_CHECK_ACCOUNT_FAILED:
      return false
    default:
      return state
  }
}

const adminReducer = combineReducers({
  athleteList,
  isRegistering,
  isRegisteringLoginExist,
  isRegistered,
  programList,
  gettingWodOfWeek,
  isWodOfWeekGot,
  wodList,
  isGettingAthletes,
  creatingWod,
});

export default adminReducer;