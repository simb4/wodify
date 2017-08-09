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
			return action.user
		case actionTypes.ACTION_LOGGED_OUT:
			return {}
		default:
			return state
	}
}

const userReducer = combineReducers({
	token,
	user,
})

export default userReducer;
