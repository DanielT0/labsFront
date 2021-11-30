import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const labsStartLoading = () =>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('labs')
            const body = await resp.json()

            const labs = body.laboratorios
            console.log(labs)
            dispatch(labLoaded(labs))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}


export const labStartAddNew = ( lab )=>{
    return async(dispatch) =>{
        try {
            const resp = await fetchConToken('labs', lab, 'POST');
            const body= await resp.json();
            console.log(body)
            if(body.ok){
                lab._id = body.laboratorio._id
                lab.nombre= body.laboratorio.nombre
                lab.descripcion=body.laboratorio.descripcion
                dispatch(labAddNew(lab))
                console.log(lab)
            }
            else{
                Swal.fire('Error',body.msg, 'error')
            }
        } catch (error) {
            // Swal('Error','Llene todas las casillas obligatorias', 'error')
            console.log(error)
        }

        // console.log(body)
    }
}

export const labSetActive = (lab) => ({
    type: types.labSetActive,
    payload: lab
});

const labAddNew = (lab) => ({
    type: types.labAddNew,
    payload: lab
});

export const labClearActiveLab = () => ({ type: types.labClearActiveLab });

const labLoaded = (labs) =>({
    type: types.labLoaded, 
    payload: labs
})

export const labStartUpdate =(lab)=>{
    return async(dispatch)=>{
        try {
            console.log(lab)
            const resp = await fetchConToken(`labs/${lab._id}`, lab, 'PUT')
            const body = await resp.json()
            
            if(body.ok){
                dispatch(labUpdated(lab))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const labUpdated = ( lab ) => ({
    type: types.labUpdated,
    payload: lab
});

export const labStartDelete=(lab)=>{
    return async(dispatch) => {
        const _id = lab._id
        try {
            const resp = await fetchConToken(`labs/${_id}`, {}, 'DELETE')
            const body = await resp.json()
            console.log(body)
            if(body.ok){
                dispatch(labDeleted(_id))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const labDeleted = (id) => ({ type: types.labDeleted, id: id});