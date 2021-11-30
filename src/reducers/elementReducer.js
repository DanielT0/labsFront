import { types } from '../types/types';

const initialState = {
    elements: [
        {
            _id: '',
            idElemento_:'',
            nombre: '',
            descripcion: '',
            categoria:'',
            laboratorio:'',
            proyecto:''
        }
    ],
    activeElement: null,
    
};

export const elementsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.elementLoaded:
            return {
                ...state,
                elements: [...action.payload]
            }
        default:
            return state;
    }


}
