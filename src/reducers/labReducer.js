import { types } from '../types/types';

const initialState = {
    labs: [
        {
            _id: '',
            nombre: '',
            descripcion: '',
        }
    ],
    labId: '',
    activeLab: null,
    
};

export const labsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.labLoaded:
            return {
                ...state,
                labs: [...action.payload]
            }
        case types.labAddNew:
            return {
                ...state,
                labs: [
                    ...state.labs,
                    action.payload
                ]
            }

        case types.labSetActive:
            return {
                ...state,
                activeLab: action.payload,
                labId: action.payload._id
            }
        
        case types.labClearActiveLab:
            return {
                ...state,
                activeLab: null
            }

        case types.labUpdated:
            return {
                ...state,
                labs: state.labs.map(
                    e => (e._id === action.payload._id) ? action.payload : e
                )
            }

        case types.labDeleted:
            return {
                ...state,
                labs: state.labs.filter(
                    e => (e._id !== action.id)
                ),
                labId:null,
                activeLab: null
            }

        default:
            return state;
    }


}
