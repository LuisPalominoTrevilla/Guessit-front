import { combineReducers } from 'redux';

import textReducer from './textReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';
import userFormReducer from './userFormReducer';
import guessitReducer from './guessitReducer';

export default combineReducers({
    text: textReducer,
    showMenu: menuReducer,
    showUserForm: userFormReducer,
    user: userReducer,
    guessit: guessitReducer
})