import { combineReducers } from 'redux';

import textReducer from './textReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';
import userFormReducer from './userFormReducer';

export default combineReducers({
    text: textReducer,
    showMenu: menuReducer,
    showUserForm: userFormReducer,
    user: userReducer,
})