import { types } from '../types/types';

const initialState = {
    gruposE: [
        {
            id: '',
            nombre: '',
            foto: '',
            minimo: '',
            laboratorioId: '',
        }
    ],
    gruposEId: '',
    activeGrupoE: null,
    
};

export const gruposEReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.gruposELoaded:
            return {
                ...state,
                gruposE: [...action.payload]
            }
        case types.grupoEAddNew:
            return {
                ...state,
                gruposE: [
                    ...state.gruposE,
                    action.payload
                ]
            }

        case types.grupoESetActive:
            return {
                ...state,
                activeGrupoE: action.payload,
                grupoEId: action.payload.id
            }
        
        case types.grupoEClearActiveGrupoE:
            return {
                ...state,
                activeGrupoE: null
            }

        case types.grupoEUpdated:
            console.log(action.payload.id);
            return {
                ...state,
                gruposE: state.gruposE.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.grupoEDeleted:
            return {
                ...state,
                gruposE: state.gruposE.filter(
                    e => (e.id !== action.id)
                ),
                grupoId:null,
                activeGrupoE: null
            }

        default:
            return state;
    }


}
