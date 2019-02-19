import { combineReducers } from 'redux';

import textReducer from './textReducer';
import menuReducer from './menuReducer';

export default combineReducers({
    text: textReducer,
    showMenu: menuReducer
})