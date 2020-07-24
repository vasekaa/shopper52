import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import eventReducer from "./reducers/eventReducer";
import { combineReducers } from 'redux';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    event: eventReducer
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;