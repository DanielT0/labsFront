import { types } from '../types/types';

const initialState = {
    users: [
        {
            _id: '',
            idU: '',
            name: '',
            email:'',
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
