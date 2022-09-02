import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';
import { authReducer } from './authReducer';
import { labsReducer } from './labReducer';
import { usersReducer } from './usersReducer';
import { elementosReducer } from './elementReducer';
import { proyectosReducer } from './proyectoReducer';
import { categoriasReducer } from './categoriaReducer';
import { gruposEReducer } from './grupoEReducer';



export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    lab: labsReducer,
    user: usersReducer,
    elemento: elementosReducer,
    proyecto: proyectosReducer,
    categoria: categoriasReducer,
    grupoE: gruposEReducer,
})

