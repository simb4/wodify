import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const workoutsFromDict = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_SUCCESS:
      return action.workouts
    case actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_STARTED:
    case actionTypes.ACTION_GET_WORKOUTS_FROM_DICT_FAILED:
      return []
    default: 
      return state
  }
}

const deleteWorkout = (state = false, action) => {
  switch(action.type){
    case actionTypes.ACTION_DELETE_WORKOUT_SUCCESS:
      return true
    case actionTypes.ACTION_DELETE_WORKOUT_STARTED:
    case actionTypes.ACTION_DELETE_WORKOUT_FAILED:
      return false
    default: 
      return state
  }
}

const deleteWorkoutFromDict = (state = false, action) => {
  switch(action.type){
    case actionTypes.ACTION_DELETE_WORKOUT_DICT_SUCCESS:
      return true
    case actionTypes.ACTION_DELETE_WORKOUT_DICT_STARTED:
    case actionTypes.ACTION_DELETE_WORKOUT_DICT_FAILED:
      return false
    default: 
      return state
  }
}

const isWorkoutAddedToDict = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_ADD_WORKOUT_DICT_SUCCESS:
      return true
    case actionTypes.ACTION_ADD_WORKOUT_DICT_FAILED:
    case actionTypes.ACTION_ADD_WORKOUT_DICT_STARTED:
    case actionTypes.ACTION_LOGGED_OUT:
      return false
    default:
      return state
  }
}

const updatedWorkoutInDict = (state = [], action) => {
  switch(action.type) {
    case actionTypes.ACTION_UPDATE_WORKOUT_DICT_SUCCESS:
      return action.workouts
    case actionTypes.ACTION_UPDATE_WORKOUT_DICT_FAILED:
    case actionTypes.ACTION_UPDATE_WORKOUT_DICT_STARTED:
    case actionTypes.ACTION_LOGGED_OUT:
      return []
    default:
      return state
  }
}

const signForWorkout = (state = false, action) => {
  switch(action.type) {
    case actionTypes.ACTION_SIGN_FOR_WORKOUT_SUCCESS:
      return true
    case actionTypes.ACTION_SIGN_FOR_WORKOUT_FAILED:
    case actionTypes.ACTION_SIGN_FOR_WORKOUT_STARTED:
    case actionTypes.ACTION_LOGGED_OUT:
      return false
    default:
      return state
  }
}

const workoutsReducer = combineReducers({
  workoutsFromDict,
  deleteWorkout,
  deleteWorkoutFromDict,
  isWorkoutAddedToDict,
  updatedWorkoutInDict,
  signForWorkout
});

export default workoutsReducer