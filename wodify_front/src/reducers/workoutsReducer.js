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

const workoutsReducer = combineReducers({
  workoutsFromDict
});

export default workoutsReducer