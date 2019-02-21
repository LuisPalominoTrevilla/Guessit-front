import { SET_USER } from './types';

export const addUser = url => dispatch => {
    dispatch({
        type: SET_USER,
        payload: url
    });
}


