// import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/rootReducer';
import { createStore, compose,  applyMiddleware } from 'redux';

// const reducers = combineReducers({
//     auth: authReducer
// })

const composeEnhancers = (typeof window !== 'undefined'  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);