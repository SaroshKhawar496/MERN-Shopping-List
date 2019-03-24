import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';

export const getItems = () => {
    return {
        // this action type below goes to itemReducer
        type: GET_ITEMS
    };
}

export const deleteItem = (id) => {
    return {
        // this action type below goes to itemReducer
        type: DELETE_ITEM,
        payload: id //sending id to the reducer, ie what to delete
    };
}

export const addItem = (item) => {
    return {
        // this action type below goes to itemReducer
        type: ADD_ITEM,
        payload: item 
    };
}

export const setItemsLoading = () => {
    return {
        // this action type below goes to itemReducer
        type: ITEMS_LOADING
    };
}