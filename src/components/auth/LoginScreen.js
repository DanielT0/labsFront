import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import './login.css';
import validator from 'validator';
// import { createStore, applyMiddleware } from 'redux';

// Note: this API requires redux@>=3.1.0
// const store = createStore(rootReducer, applyMiddleware(thunk));

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const [ formLoginValues, handleLoginInputChange] = useForm ({
        lEmail: 'danieltoor@unisabana.edu.co',
        lPassword: '123456n%M'
    });

    const [ formRegisterValues, handleRegisterInputChange] = useForm ({
        rId: '',
        rEmail: '',
        rPassword: '',
        rName: '',
        rPassword1: '',
        rPassword2: '' 
    });

    const {  rId, rName, rEmail, rPassword1, rPassword2} = formRegisterValues;

    const { lEmail, lPassword } = formLoginValues;
    

    const handleLogin = ( e ) => {
        e.preventDefault();
        if(! validator.isEmail(lEmail)){
            Swal.fire('Error', 'Ingrese un correo válido', 'error')
            return
        }
        // console.log(lEmail, lPassword)
        dispatch(startLogin( lEmail, lPassword));
    }

    const handleRegister = ( e ) => {
        e.preventDefault();
        if(rPassword1!=rPassword2){
            Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
            return
        }
        if(validator.isEmpty(rId)){
            Swal.fire('Error', 'Ingrese un Id', 'error')
            return
        }
        if(! validator.isEmail(rEmail)){
            Swal.fire('Error', 'Ingrese un correo válido', 'error')
            return
        }
        if(validator.isNumeric(rName) || validator.isEmpty(rName)){
            Swal.fire('Error', 'El nombre no debe estar vacío ni contener números ni carácteres especiales', 'error')
            return
        }
        dispatch( startRegister(rId, rEmail, rPassword1, rName) )
        // dispatch(startLogin( lEmail, lPassword));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit = { handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value = {lEmail}
                                onChange= { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value = {lPassword}
                                onChange= { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                    <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Id"
                                name="rId"
                                value={rId}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}