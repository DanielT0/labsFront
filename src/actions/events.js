import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = ( event )=>{
    return async(dispatch, getState) =>{
        const {uid, name} = getState().auth;
        try {
            const resp = await fetchConToken('prestamos', event, 'POST');
            const body= await resp.json();
            if(body.ok){
                event._id = body.prestamo._id
                event.start= body.prestamo.fechaPrestamo
                event.end=body.prestamo.fechaDevolucion
                event.user={
                    _id: uid,
                    name: name
                }
                console.log(event)
                dispatch(eventAddNew(event))
            }
        } catch (error) {
            Swal('Error','Llene todas las casillas obligatorias', 'error')
            console.log(error)
        }

        // console.log(body)
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventStartLoading = () =>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('prestamos')
            const body = await resp.json()

            const prests = prepareEvents(body.prestamos)
            dispatch(eventLoaded(prests))
            console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (events) =>({
    type: types.eventLoaded, 
    payload: events
})

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdate =(event)=>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken(`prestamos/${event._id}`, event, 'PUT')
            const body = await resp.json()
            event.start= body.prestamo.fechaPrestamo
            event.end=body.prestamo.fechaDevolucion
            console.log(body)
            if(body.ok){
                dispatch(eventUpdated(event))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete=()=>{
    return async(dispatch, getState) => {

        const {_id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`prestamos/${_id}`, {}, 'DELETE')
            const body = await resp.json()
            console.log(body)
            if(body.ok){
                dispatch(eventDeleted())
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const eventDeleted = () => ({ type: types.eventDeleted });


