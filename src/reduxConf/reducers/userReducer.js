import { SET_USER, REMOVE_USER, ADD_USER_IMAGES } from 'reduxConf/actions/types';

const initialState = {
    user: {},
    images: []
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
        case ADD_USER_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        default:
            return state;
    }
}