import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const workouts = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_WORKOUTS.success:
    console.log(action.workouts[0].timestamp_start)
    console.log(new Date(action.workouts[0].timestamp_start))
      return action.workouts.map(work => ({...work,
        start: new Date(work.timestamp_start+'Z'),
        end: new Date(work.timestamp_end+'Z'),
      }))
    case actionTypes.ACTION_ADD_WORKOUT.success:
      return [...state, action.workout]
    default:
      return state;
  }
}

const coaches = (state = [], action) => {
  switch(action.type){
    case actionTypes.ACTION_GET_COACHES.success:
      return action.coaches
    default:
      return state;
  }
}

const workoutsReducer = combineReducers({
  workouts,
  coaches,
});

export default workoutsReducer