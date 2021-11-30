import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';
import { authReducer } from './authReducer';
import { labsReducer } from './labReducer';
import { usersReducer } from './usersReducer';
import { elementsReducer } from './elementReducer';



export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    lab: labsReducer,
    user: usersReducer,
    element: elementsReducer
})

