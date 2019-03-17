import { combineReducers } from 'redux';

import textReducer from './textReducer';
import menuReducer from './menuReducer';
import logReducer from './logReducer';
import userReducer from './userReducer';

export default combineReducers({
    text: textReducer,
    showMenu: menuReducer,
    showLogIn: logReducer,
    user: userReducer,
})