import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const isLoginExist = (state = false, action) => {
  switch (action.type) {
    case actionTypes.ACTION_CHECK_LOGIN_EXIST:
        return true;
    case actionTypes.ACTION_CHECK_LOGIN_NOTEXIST:
    case actionTypes.ACTION_CHECK_LOGIN_FAILED:
    case actionTypes.ACTION_CHECK_LOGIN_STARTED:
        return false;
    default:
        return state;
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
            return action.user.is_admin
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
    isLoginExist,
    isLoggedIn,
    isLoggingIn,
    isAdmin,
    errorMessage,
});

export default authReducer;
