import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

let devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null

let composer = null;
if (devTools) {
    composer = compose(
        applyMiddleware(...middleware),
        devTools
    );
} else {
    composer = applyMiddleware(...middleware);
}
const store = createStore(
    rootReducer,
    initialState,
    composer
);

export default store;