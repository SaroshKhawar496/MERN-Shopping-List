// to bring together all other reducers in the app. this is rootReducer
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    item: itemReducer,
    // other reducers
    auth: authReducer,
    error: errorReducer
});