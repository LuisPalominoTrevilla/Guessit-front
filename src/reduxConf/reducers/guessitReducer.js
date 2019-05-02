import { SET_IMAGES, REMOVE_IMAGE } from 'reduxConf/actions/types';

const initialState = {
    images: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case REMOVE_IMAGE:
            const filteredImages = state.images.filter(image => image.id !== action.payload);
            return {
                ...state,
                images: filteredImages
            }
        default:
            return state;
    }
}