import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/auth'

export const Navbar = () => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(startLogout())
    }

    const goToLab = () => {
        console.log("buhbiubui")
        return (
            <Route
                exact
                path="/"
            >
                <Redirect to="/laboratorios" />
            </Route>)
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            <div>
                <Link to="/laboratorios" className="btn btn-outline-primary">Laboratorios</Link>
            </div>

            <div>
                <Link to="/" className="btn btn-outline-primary">Préstamos</Link>
            </div>

            <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-atl"></i>
                <span> Salir</span>
            </button>

        </div>
    )
}
