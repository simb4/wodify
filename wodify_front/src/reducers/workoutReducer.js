import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const workouts = (state = [], action) => {
  let newWorkouts = state.slice();
  switch(action.type) {
    case actionTypes.ACTION_GET_WORKOUTS.success:
      newWorkouts = action.workouts;
      break;
    case actionTypes.ACTION_ADD_WORKOUT.success:
      newWorkouts.push(action.workout);
      break;
    case actionTypes.ACTION_UPDATE_WORKOUT.success:
      newWorkouts = newWorkouts.map(work => (
        work.id === action.workout.id
          ? action.workout
          : work
        ));
      break;
    case actionTypes.ACTION_DELETE_WORKOUT.success:
      newWorkouts = newWorkouts.filter(work => work.id !== action.id);
      break;
    default:
      return state;
  }
  return newWorkouts.map(work => ({...work,
    start: new Date(work.timestamp_start+'Z'),
    end: new Date(work.timestamp_end+'Z'),
  }));
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