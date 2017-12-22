import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const workouts = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WORKOUTS.success:
      return action.workouts
    default:
      return state;
  }
}



const workoutsReducer = combineReducers({
  workouts,
});

export default workoutsReducer