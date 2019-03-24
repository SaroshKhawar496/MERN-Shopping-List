import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from './types';

export const getItems = () => {
    return {
        // this action type below goes to itemReducer
        type: GET_ITEMS
    };
}