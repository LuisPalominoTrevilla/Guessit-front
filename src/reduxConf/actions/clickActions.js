import { SET_MENU_VALUE, SET_LOG_VALUE, SET_REG_VALUE } from './types';
export const showHideMenu = item => dispatch => {
    dispatch({
        type: SET_MENU_VALUE,
        payload: item
    });
}
export const showHideLogIn = item => dispatch => {
    dispatch({
        type: SET_LOG_VALUE,
        payload: item
    });
}

export const showHideRegister = item => dispatch => {
    dispatch({
        type: SET_REG_VALUE,
        payload: item
    });
}
