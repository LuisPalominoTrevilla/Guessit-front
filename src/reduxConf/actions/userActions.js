import { SET_USER, REMOVE_USER } from './types';

export const addUser = url => dispatch => {
    dispatch({
        type: SET_USER,
        payload: url
    });
}

export const removeUser = () => dispatch => {
    console.log('Starting to remove user');
    dispatch({
        type: REMOVE_USER
    });
}
