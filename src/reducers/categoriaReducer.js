import { types } from '../types/types';

const initialState = {
    categorias: [
        {
            id: '',
            nombre: '',
            descripcion: '',
        }
    ],
    categoriaId: '',
    activeCategoria: null,
    
};

export const categoriasReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.categoriasLoaded:
            return {
                ...state,
                categorias: [...action.payload]
            }
        case types.categoriaAddNew:
            console.log(action.payload.id);
            return {
                ...state,
                categorias: [
                    ...state.categorias,
                    action.payload
                ]
            }

        case types.categoriaSetActive:
            return {
                ...state,
                activeCategoria: action.payload,
                categoriaId: action.payload.id
            }
        
        case types.categoriaClearActiveCategoria:
            return {
                ...state,
                activeCategoria: null
            }

        case types.categoriaUpdated:
            console.log(action.payload.id);
            return {
                ...state,
                proyectos: state.categorias.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.categoriaDeleted:
            return {
                ...state,
                categorias: state.categorias.filter(
                    e => (e.id !== action.id)
                ),
                categoriaId:null,
                activeCategoria: null
            }

        default:
            return state;
    }


}
