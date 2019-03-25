import axios from 'axios';
import {returnErrors} from './errorActions'

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL   
} from './types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {

    // User Loading
    dispatch({type: USER_LOADING}); // calls the authReducer
    
    // Get token from local storage
    const token = getState().auth.token;// calls the authReducer

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // if token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    axios.get('/api/auth/user',config)
      .then(res => dispatch({
          type: USER_LOADED,
          payload: res.data //object with user object and token
      }))
      .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status));

          dispatch({
              type: AUTH_ERROR
          })
      })
}