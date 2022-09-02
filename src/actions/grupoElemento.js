import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const gruposEStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('grupos-elementos')
            const body = await resp.json()

            const grupos = body.grupos
            dispatch(gruposELoaded(grupos))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}


export const grupoEStartAddNew = (grupoE) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('grupos-elementos', grupoE, 'POST');
            const body = await resp.json();
            if (body.ok) {
                grupoE.id = body.grupo.id;
                grupoE.nombre = body.grupo.nombre;
                grupoE.foto = body.grupo.foto;
                grupoE.minimo = body.grupo.minimo;
                grupoE.laboratorioId = body.grupo.laboratorioId;
                dispatch(grupoEAddNew(grupoE));
                Swal.fire('¡Listo!',
                    'Grupo de elementos guardado',
                    'success')
            }
            else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }

        // console.log(body)
    }
}

export const grupoESetActive = (grupoE) => ({
    type: types.grupoESetActive,
    payload: grupoE
});

const grupoEAddNew = (grupoE) => ({
    type: types.grupoEAddNew,
    payload: grupoE
});

export const grupoEClearActivegrupoE = () => ({ type: types.grupoEClearActiveGrupoE});

const gruposELoaded = (grupos) => ({
    type: types.gruposELoaded,
    payload: grupos
})

export const grupoEStartUpdate = (grupoE) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`grupos-elementos/grupo/${grupoE.id}`, grupoE, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                dispatch(grupoEUpdated(grupoE))
                Swal.fire('¡Listo!',
                    'Grupo de elementos actualizado',
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

const grupoEUpdated = (grupoE) => ({
    type: types.grupoEUpdated,
    payload: grupoE
});

export const grupoEStartDelete = (grupoE) => {
    return async (dispatch) => {
        const id = grupoE.id
        try {
            const resp = await fetchConToken(`grupos-elementos/${id}`, {}, 'DELETE')
            const body = await resp.json()
            if (body.ok) {
                dispatch(grupoEDeleted(id))
                Swal.fire('¡Listo!',
                    'Grupo de elementos eliminado',
                    'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const grupoEDeleted = (id) => ({ type: types.grupoEDeleted, id: id });