import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

// case actionTypes.ACTION_ADD_WORKOUT_SUCCESS:
//   return [...state[action.day_id], {date: action.date, ...action.workout}]

const getWorkouts = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WORKOUTS_SUCCESS:
      return action.workouts
    case actionTypes.ACTION_ADD_WORKOUT_SUCCESS:
      return [...state, action.workout];
    case actionTypes.ACTION_GET_WORKOUTS_STARTED:
    case actionTypes.ACTION_GET_WORKOUTS_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    default: 
      return state
  }
}

const athleteList = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_ATHLETES_SUCCESS:
      return action.athletes
    case actionTypes.ACTION_GET_ATHLETES_STARTED:
    case actionTypes.ACTION_GET_ATHLETES_FAILED:
    case actionTypes.ACTION_CLEAR_ATHLETE_LIST:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    default:
      return state
  }
}

const coachList = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_COACHES_SUCCESS:
      return action.coaches
    case actionTypes.ACTION_GET_COACHES_STARTED:
    case actionTypes.ACTION_GET_COACHES_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    default:
      return state
  }
}

const isGettingGyms = (state = false, action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_GYMS_SUCCESS:
    case actionTypes.ACTION_GET_GYMS_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
      return false
    case actionTypes.ACTION_GET_GYMS_STARTED:
      return true
    default:
      return state
  }
}

const gymsList = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_GYMS_SUCCESS:
      return action.gyms
    case actionTypes.ACTION_GET_GYMS_STARTED:
    case actionTypes.ACTION_GET_GYMS_FAILED:
    case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
    case actionTypes.ACTION_CLEAR_WOD_CREATED:
      return ""
    default: 
      return state
  }
}

const isWodCreated = (state = {}, action) => {
  switch (action.type){
    case actionTypes.ACTION_ADD_WOD_SUCCESS:
      return action.wod
    case actionTypes.ACTION_ADD_WOD_STARTED:
    case actionTypes.ACTION_ADD_WOD_FAILED:
    case actionTypes.ACTION_CLEAR_WOD_CREATED:
    case actionTypes.ACTION_LOGGED_OUT:
      return {}
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
    case actionTypes.ACTION_LOGGED_OUT:
      return false
    default:
      return state
  }
}

const isWodOfWeekGot = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WEEK_WOD_STARTED:
    case actionTypes.ACTION_GET_WEEK_WOD_FAILED: 
    case actionTypes.ACTION_LOGGED_OUT:
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
      case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
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
    case actionTypes.ACTION_LOGGED_OUT:
      return false
    default:
      return state
  }
}

const isWorkoutCreated = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_ADD_WORKOUT_SUCCESS:
      return true
    case actionTypes.ACTION_ADD_WORKOUT_FAILED:
    case actionTypes.ACTION_ADD_WORKOUT_STARTED:
    case actionTypes.ACTION_LOGGED_OUT:
      return false
    default:
      return state
  }
}

const updatedWorkout = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_UPDATE_WORKOUT_SUCCESS:
      return action.workouts
    case actionTypes.ACTION_UPDATE_WORKOUT_FAILED:
    case actionTypes.ACTION_UPDATE_WORKOUT_STARTED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    default:
      return state
  }
}

const csvUploaded = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_UPLOAD_CSV_SUCCESS:
      return true
    case actionTypes.ACTION_UPLOAD_CSV_FAILED:
    case actionTypes.ACTION_UPLOAD_CSV_STARTED:
    case actionTypes.ACTION_CLEAR_ALL:
    case actionTypes.ACTION_LOGGED_OUT:
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
  getWorkouts,
  gymsList,
  isGettingGyms,
  coachList,
  isWorkoutCreated,
  isWodCreated,
  updatedWorkout,
  csvUploaded,
});

export default adminReducer;