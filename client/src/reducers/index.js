// to bring together all other reducers in the app. this is rootReducer
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer,
    // other reducers
});