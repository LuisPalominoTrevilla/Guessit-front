import { SET_USER, REMOVE_USER } from 'reduxConf/actions/types';

const initialState = {
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case REMOVE_USER:
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
}