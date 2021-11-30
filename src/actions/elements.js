import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"


export const elementsStartLoading = () =>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('elementos')
            const body = await resp.json()

            const elementos = body.elementos
            // console.log(usuarios)
            console.log(elementos)
            dispatch(elementLoaded(elementos))
        } catch (error) {
            console.log(error)
        }
    }
}


const elementLoaded = (elements) =>({
    type: types.elementLoaded, 
    payload: elements
})