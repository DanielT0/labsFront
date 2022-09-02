import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"

export const categoriasStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('categorias')
            const body = await resp.json()

            const categorias = body.categorias
            dispatch(categoriasLoaded(categorias))
            // console.log(prests)
        } catch (error) {
            console.log(error)
        }
    }
}


export const categoriaStartAddNew = (categoria) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken('categorias', categoria, 'POST');
            const body = await resp.json();
            if (body.ok) {
                categoria.id = body.categoria.id
                categoria.nombre = body.categoria.nombre
                dispatch(categoriaAddNew(categoria))
                Swal.fire('¡Listo!',
                    'Categoría agregada',
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

export const categoriaSetActive = (categoria) => ({
    type: types.categoriaSetActive,
    payload: categoria
});

const categoriaAddNew = (categoria) => ({
    type: types.categoriaAddNew,
    payload: categoria
});

export const categoriaClearActiveCategoria = () => ({ type: types.categoriaClearActiveCategoria });

const categoriasLoaded = (categorias) => ({
    type: types.categoriasLoaded,
    payload: categorias
})

export const categoriaStartUpdate = (categoria) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`categorias/categoria/${categoria.id}`, categoria, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                dispatch(categoriaUpdated(categoria))
                Swal.fire('¡Listo!',
                    'Categoría actualizada',
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

const categoriaUpdated = (categoria) => ({
    type: types.categoriaUpdated,
    payload: categoria
});

export const categoriaStartDelete = (categoria) => {
    return async (dispatch) => {
        const id = categoria.id
        try {
            const resp = await fetchConToken(`categorias/${id}`, {}, 'DELETE')
            const body = await resp.json()
            if (body.ok) {
                dispatch(categoriaDeleted(id))
                Swal.fire('¡Listo!',
                    'Categoría eliminada',
                    'success')
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const categoriaDeleted = (id) => ({ type: types.categoriaDeleted, id: id });