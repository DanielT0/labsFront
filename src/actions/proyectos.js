import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const proyectosStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('proyectos')
            const body = await resp.json()

            const proyectos = body.proyectos
            console.log(proyectos)
            dispatch(proyectoLoaded(proyectos))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}


export const proyectoStartAddNew = (proyecto) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('proyectos', proyecto, 'POST');
            const body = await resp.json();
            if (body.ok) {
                proyecto.id = body.proyecto.id
                proyecto.nombre = body.proyecto.nombre
                proyecto.descripcion = body.proyecto.descripcion
                proyecto.laboratorioId = body.proyecto.laboratorioId
                console.log(body);
                dispatch(proyAddNew(proyecto))
                Swal.fire('¡Listo!',
                    'Proyecto agregado',
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

export const proySetActive = (proyecto) => ({
    type: types.proyectoSetActive,
    payload: proyecto
});

const proyAddNew = (proy) => ({
    type: types.proyectoAddNew,
    payload: proy
});

export const proyClearActiveProy = () => ({ type: types.proyectoClearActiveProy });

const proyectoLoaded = (proyectos) => ({
    type: types.proyectosLoaded,
    payload: proyectos
})

export const proyectoStartUpdate = (proyecto) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`proyectos/proyecto/${proyecto.id}`, proyecto, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                console.log(body.proyecto);
                dispatch(proyectoUpdated(proyecto))
                Swal.fire('¡Listo!',
                    'Proyecto actualizado',
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

const proyectoUpdated = (proy) => ({
    type: types.proyectoUpdated,
    payload: proy
});

export const proyStartDelete = (lab) => {
    return async (dispatch) => {
        const id = lab.id
        console.log(id);
        try {
            const resp = await fetchConToken(`proyectos/${id}`, {}, 'DELETE')
            const body = await resp.json()
            console.log(body)
            if (body.ok) {
                dispatch(proyDeleted(id))
                Swal.fire('¡Listo!',
                    'Proyecto eliminado',
                    'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const proyDeleted = (id) => ({ type: types.proyectoDeleted, id: id });