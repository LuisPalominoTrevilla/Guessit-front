import { NEW_TEXT } from './types';

export const changeText = text => dispatch => {
    dispatch({
        type: NEW_TEXT,
        payload: text
    });
}
