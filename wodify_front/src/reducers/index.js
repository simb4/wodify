import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import wodReducer from './wodReducer'
import workoutsReducer from './workoutsReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    wod: wodReducer,
    work: workoutsReducer,
});

export default rootReducer;