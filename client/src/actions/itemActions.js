import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items').then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data // data that comes from the backend
    }))
}


export const addItem = (item) => dispatch => {
    axios.post('/api/items', item).then(res => dispatch ({
        type: ADD_ITEM,
        payload: res.data //item that was newly added
    }))
}

export const deleteItem = (id) => {
    return {
        // this action type below goes to itemReducer
        type: DELETE_ITEM,
        payload: id //sending id to the reducer, ie what to delete
    };
}

export const setItemsLoading = () => {
    return {
        // this action type below goes to itemReducer
        type: ITEMS_LOADING
    };
}