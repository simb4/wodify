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

const addWod = (state = {}, action) => {
  switch (action.type){
    case actionTypes.ACTION_ADD_WOD_SUCCESS:
      return action.wod
    case actionTypes.ACTION_ADD_WOD_FAILED:
    case actionTypes.ACTION_ADD_WOD_STARTED:
      return {}
    default:
      return state
  }
}

const adminReducer = combineReducers({
  athleteList
});

export default adminReducer;