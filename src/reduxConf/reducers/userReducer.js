import { SET_USER, REMOVE_USER, ADD_USER_IMAGES, ADD_USER_IMAGE } from 'reduxConf/actions/types';

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
        case ADD_USER_IMAGE:
            const images_tmp = state.images;
            images_tmp.push(action.payload);
            return {
                ...state,
                images: images_tmp
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