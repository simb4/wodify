import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const isPasswordSet = (state = false, action) => {
    switch(action.type) {
        case actionTypes.ACTION_SET_PASSWORD_STARTED:
        case actionTypes.ACTION_SET_PASSWORD_FAILED:
        case actionTypes.ACTION_LOGGED_OUT:
            return false
        case actionTypes.ACTION_SET_PASSWORD_SUCCESS:
            return true
        default:
            return state 
    }
}

const isPasswordSetting = (state = false, action) => {
    switch(action.type) {
        case actionTypes.ACTION_SET_PASSWORD_STARTED:
            return true
        case actionTypes.ACTION_SET_PASSWORD_SUCCESS:
        case actionTypes.ACTION_SET_PASSWORD_FAILED:
        case actionTypes.ACTION_LOGGED_OUT:
            return false
        default:
            return state 
    }
}


const isLoggedIn = (state = false, action) => {
    switch (action.type) {
        case actionTypes.ACTION_LOGIN_SUCCESS:
            return true;
        case actionTypes.ACTION_LOGGED_OUT:
            return false;
        default:
            return state;
    }
}

const isLoggingIn = (state = false, action) => {
    switch (action.type) {
        case actionTypes.ACTION_CHECK_LOGIN_STARTED:
        case actionTypes.ACTION_LOGIN_STARTED:
            return true;
        case actionTypes.ACTION_LOGIN_SUCCESS:
        case actionTypes.ACTION_LOGIN_FAILED:
        case actionTypes.ACTION_LOGGED_OUT:
        case actionTypes.ACTION_CHECK_LOGIN_EXIST:
        case actionTypes.ACTION_CHECK_LOGIN_NOTEXIST:
        case actionTypes.ACTION_CHECK_LOGIN_FAILED:
            return false;
        default:
            return state;
    }
}

// const isLoggingOut = (state = false, action ) => {
//     switch(action.type) {
//         case actionTypes.ACTION_LOGOUT_STARTED:
//         case actionTypes.ACTION_LOGOUT_FAILED:
//             return false
//         case actionTypes.ACTION_LOGGED_OUT:
//             return true
//         default: 
//             return state
//     }
// }

const isAdmin = (state="" , action) => {
    switch(action.type) {
        case actionTypes.ACTION_LOGIN_SUCCESS:
            return action.user.is_moderator
        case actionTypes.ACTION_LOGIN_FAILED:
        case actionTypes.ACTION_LOGIN_STARTED:
        case actionTypes.ACTION_LOGGED_OUT:
            return false
        default: 
            return state
    }
}

const errorMessage = (state = "", action) => {
    switch (action.type) {
        case actionTypes.ACTION_LOGIN_STARTED:
        case actionTypes.ACTION_LOGIN_SUCCESS:
        case actionTypes.ACTION_LOGGED_OUT:
        case actionTypes.ACTION_CHECK_LOGIN_EXIST:
        case actionTypes.ACTION_CHECK_LOGIN_STARTED:
            return "";
        case actionTypes.ACTION_LOGIN_FAILED:
        case actionTypes.ACTION_CHECK_LOGIN_NOTEXIST:
        case actionTypes.ACTION_CHECK_LOGIN_FAILED:
            return action.errorMessage;
        default:
            return state;
    }
}

const authReducer = combineReducers({
    isLoggedIn,
    isLoggingIn,
    isAdmin,
    errorMessage,
    isPasswordSetting,
    isPasswordSet
});

export default authReducer;
