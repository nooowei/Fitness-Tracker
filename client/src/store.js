import { createStore, applyMiddleware, compose } from 'redux';
// thunk is used to make async calls
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// initial state of the store, an empty object
const initialState = {};

// array of middlewares we will be using, right now it is just thunk
const middleware = [thunk];

//creating a store using createStore method
// 1st param is a reducer
// 2nd param is the preloadedState - optional
// 3rd param is necessary, just copy and paste the line starting with window
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

// this is it for the file, everything is setup here.
export default store;