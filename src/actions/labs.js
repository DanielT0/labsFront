import axios from "axios"
import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const labsStartLoading = () =>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('laboratorios')
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

export const updateLabsFiltrados = ( labs ) =>{
    return async(dispatch)=>{
        try {
            console.log(labs)
            dispatch(labFiltered(labs))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}

const labFiltered = (labs) =>({
    type: types.labsFiltradosUpdate, 
    payload: labs
})


export const labStartAddNew = ( lab )=>{
    return async(dispatch) =>{
        try {
            const resp = await fetchConToken('laboratorios', lab, 'POST');
            const body= await resp.json();
            console.log(body)
            if(body.ok){
                lab.id=body.id
                lab.nombre= body.nombre
                lab.descripcion=body.descripcion
                dispatch(labAddNew(lab))
                Swal.fire('¡Listo!',
                'Laboratorio agregado',
                'success')
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
            const resp = await fetchConToken(`laboratorios/${lab.id}`, lab, 'PUT')
            const body = await resp.json()
            
            if(body.ok){
                dispatch(labUpdated(lab))
                Swal.fire('¡Listo!',
                'Laboratorio actualizado',
                'success')
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
        const id = lab.id
        console.log(id);
        try {
            const resp = await fetchConToken(`laboratorios/${id}`, {}, 'DELETE')
            const body = await resp.json()
            console.log(body)
            if(body.ok){
                dispatch(labDeleted(id))
                Swal.fire('¡Listo!',
                'Laboratorio eliminado',
                'success')
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const labDeleted = (id) => ({ type: types.labDeleted, id: id});