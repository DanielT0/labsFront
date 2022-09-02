import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const elementosStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('elementos')
            const body = await resp.json()

            const elementos = body.elementos
            dispatch(elementosLoaded(elementos))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}


export const elementoStartAddNew = (elemento) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('elementos', elemento, 'POST');
            const body = await resp.json();
            if (body.ok) {
                elemento.id = body.elemento.id;
                elemento.referencia = body.elemento.id;
                elemento.nombre = body.elemento.nombre;
                elemento.descripcion = body.elemento.descripcion;
                elemento.estado=body.elemento.estado;
                elemento.observaciones=body.elemento.observaciones;
                elemento.proyectoId=body.elemento.proyectoId;
                elemento.categoriumId = body.elemento.categoriumId;
                elemento.grupoId=body.elemento.grupoId;
                dispatch(elementoAddNew(elemento))
                Swal.fire('¡Listo!',
                    'Elemento agregado',
                    'success')
            }
            else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            // Swal('Error','Llene todas las casillas obligatorias', 'error')
            console.log(error)
        }

        // console.log(body)
    }
}

export const elementoSetActive = (elemento) => ({
    type: types.elementoSetActive,
    payload: elemento
});

const elementoAddNew = (elemento) => ({
    type: types.elementoAddNew,
    payload: elemento
});

export const elementoClearActiveelemento = () => ({ type: types.elementoClearActiveElemento });

const elementosLoaded = (elementos) => ({
    type: types.elementosLoaded,
    payload: elementos
})

export const elementoStartUpdate = (elemento) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`elementos/elemento/${elemento.id}`, elemento, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                dispatch(elementoUpdated(elemento))
                Swal.fire('¡Listo!',
                    'Elemento actualizado',
                    'success')
            } else {
                if (body.msg) {
                    Swal.fire('Error', body.msg, 'error')
                }
                else {
                    Swal.fire('Error', body.errors.laboratorioId.msg, 'error')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const elementoUpdated = (elemento) => ({
    type: types.elementoUpdated,
    payload: elemento
});

export const elementoStartDelete = (elemento) => {
    return async (dispatch) => {
        const id = elemento.id
        try {
            const resp = await fetchConToken(`elementos/${id}`, {}, 'DELETE')
            const body = await resp.json()
            if (body.ok) {
                dispatch(elementoDeleted(id))
                Swal.fire('¡Listo!',
                    'Elemento eliminado',
                    'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const elementoDeleted = (id) => ({ type: types.elementoDeleted, id: id });