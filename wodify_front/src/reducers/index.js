import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import wodReducer from './wodReducer'
import workoutReducer from './workoutReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    wod: wodReducer,
    workout: workoutReducer,
});

export default rootReducer;