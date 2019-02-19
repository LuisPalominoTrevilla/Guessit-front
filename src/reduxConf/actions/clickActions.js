import { SET_ITEM_VALUE } from './types';
export const showHideMenu = item => dispatch => {
    dispatch({
        type: SET_ITEM_VALUE,
        payload: item
    });
}
