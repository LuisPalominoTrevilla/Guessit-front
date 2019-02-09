import { NEW_TEXT } from 'reduxConf/actions/types';

const initialState = {
    message: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NEW_TEXT:
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
}
