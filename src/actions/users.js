import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"


export const usersStartLoading = () =>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('usuarios')
            const body = await resp.json()

            const usuarios = body.usuarios
            console.log(usuarios)
            dispatch(userLoaded(usuarios))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}


const userLoaded = (users) =>({
    type: types.userLoaded, 
    payload: users
})