import { types } from '../types/types';

const initialState = {
    users: [
        {
            id: '',
            nombre: '',
            correo:'',
            laboratorioId: '',
        }
    ],
    
};


export const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.userLoaded:
            return {
                ...state,
                users: [...action.payload]
            }

        default:
            return state;
    }


}
