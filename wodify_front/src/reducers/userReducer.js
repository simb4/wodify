import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const token = (state = "", action) => {
	switch(action.type) {
		case actionTypes.ACTION_LOGIN_SUCCESS:
			return action.token
		case actionTypes.ACTION_LOGGED_OUT:
			return ""
		default: 
			return state
	}
}

const user = (state = {}, action) => {
	switch(action.type) {
		case actionTypes.ACTION_LOGIN_SUCCESS:
		case actionTypes.ACTION_UPDATE_PROFILE_SUCCESS:
			return action.user
		case actionTypes.ACTION_LOGGED_OUT:
			return {}
		default:
			return state
	}
}

const isProfileUpdating = (state = false, action) => {
	switch(action.type) {
		case actionTypes.ACTION_UPDATE_PROFILE_STARTED:
			return true
		case actionTypes.ACTION_UPDATE_PROFILE_SUCCESS:
		case actionTypes.ACTION_UPDATE_PROFILE_FAILED:
		case actionTypes.ACTION_LOGGED_OUT:
			return false
		default:
			return state
	}
}

const userReducer = combineReducers({
	token,
	user,
	isProfileUpdating,
})

export default userReducer;
