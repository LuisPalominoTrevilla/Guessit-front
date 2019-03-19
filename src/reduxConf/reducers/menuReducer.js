import { SET_MENU_VALUE } from 'reduxConf/actions/types';

const initialState = {
    show: false,
    isInitial: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_MENU_VALUE:
            return {
                ...state,
                show: action.payload,
                isInitial: false
            };
        default:
            return state;
    }
}
