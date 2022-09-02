import { types } from '../types/types';

const initialState = {
    proyectos: [
        {
            id: '',
            nombre: '',
            descripcion: '',
            laboratorioId: '',
        }
    ],
    proyectoId: '',
    activeProy: null,
    
};

export const proyectosReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.proyectosLoaded:
            return {
                ...state,
                proyectos: [...action.payload]
            }
        case types.proyectoAddNew:
            console.log(action.payload.id);
            return {
                ...state,
                proyectos: [
                    ...state.proyectos,
                    action.payload
                ]
            }

        case types.proyectoSetActive:
            return {
                ...state,
                activeProy: action.payload,
                proyectoId: action.payload.id
            }
        
        case types.proyectoClearActiveProy:
            return {
                ...state,
                activeProy: null
            }

        case types.proyectoUpdated:
            console.log(action.payload.id);
            return {
                ...state,
                proyectos: state.proyectos.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.proyectoDeleted:
            return {
                ...state,
                proyectos: state.proyectos.filter(
                    e => (e.id !== action.id)
                ),
                proyectoId:null,
                activeProy: null
            }

        default:
            return state;
    }


}
