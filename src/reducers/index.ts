
import { combineReducers } from 'redux';
import userReducer from './userSlice';
// Import your reducers here

const rootReducer = combineReducers({
    // Add your reducers here
        user: userReducer,
});

export default rootReducer;