import { SET_MENU_VALUE, SET_USRFRM_VALUE } from './types';
export const showHideMenu = item => dispatch => {
    dispatch({
        type: SET_MENU_VALUE,
        payload: item
    });
}
export const showHideUserForm = item => dispatch => {
    dispatch({
        type: SET_USRFRM_VALUE,
        payload: item
    });
}
