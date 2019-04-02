import { SET_USRFRM_VALUE } from 'reduxConf/actions/types';

const initialState = {
    show: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USRFRM_VALUE:
            return {
                ...state,
                show: action.payload
            };
        default:
            return state;
    }
}