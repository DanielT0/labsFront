import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        console.log(body)
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }
        else {
            Swal.fire('Error', body.msg, 'error')
        }
        console.log(body)
        console.log(email, password)
    }
}

const checkingFinish = () => ({type: types.authCheckingFinish})

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout=() =>{
    return ( dispatch ) =>{
        localStorage.clear()
        dispatch(logout())
    }
}

const logout = () =>({type: types.authLogout})

export const startRegister = ( idU, email, password, name) => {
    return async (dispatch) => {
        console.log("hiniiun")
        const tipo=''
        const resp = await fetchSinToken('auth/new', { idU, email, password, name, tipo }, 'POST');
        const body = await resp.json();
        console.log(resp, body)

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            if(body.errors!=null){
                Swal.fire('Error', body.errors.password.msg, 'error');
            }
            else{
                Swal.fire('Error', body.msg, 'error');
            }
            // dispatch(checkingFinish());
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}