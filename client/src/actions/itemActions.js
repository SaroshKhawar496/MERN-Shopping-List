import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from './types';

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