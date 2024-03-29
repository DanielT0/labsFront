import { types } from '../types/types';

const initialState = {
    elementos: [
        {
            id: '',
            referencia: '',
            nombre: '',
            descripcion: '',
            estado: '',
            observaciones: '',
            proyectoId: '',
            categoriumId: '',
            grupoId: '',
        }
    ],
    activeElemento: null,

};

export const elementosReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.elementosLoaded:
            return {
                ...state,
                elementos: [...action.payload]
            }
            
        case types.elementoAddNew:
            console.log(action.payload.id);
            return {
                ...state,
                elementos: [
                    ...state.elementos,
                    action.payload
                ]
            }

        case types.elementoSetActive:
            return {
                ...state,
                activeElemento: action.payload,
                elementoId: action.payload.id
            }

        case types.elementoClearActiveElemento:
            return {
                ...state,
                activeElemento: null
            }

        case types.elementoUpdated:
            console.log(action.payload.id);
            return {
                ...state,
                proyectos: state.elementos.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.elementoDeleted:
            return {
                ...state,
                elementos: state.elementos.filter(
                    e => (e.id !== action.id)
                ),
                activeElemento: null
            }

        default:
            return state;
    }


}
