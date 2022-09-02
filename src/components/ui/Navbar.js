import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/auth'
import "./navbar.css";
import logo from '../../assets/logo.png';

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

    var nameArr = name.split(" ");
    var initials = '';
    var namelen = nameArr.length;
    initials = nameArr[0][0] + nameArr[namelen - 2][0];

    // for( var i =0; i < nameArr.length; i++){
    //     initials = initials+ nameArr[i][0];
    // }

    return (
        <header>
            <span className="navbar__logo">
                <img src={logo} alt="Tag" height="70" />
            </span>
            <ul class="nav__links">
                <li>
                    <a><Link to="/laboratorios">Laboratorios</Link></a>
                </li>

                <li>
                    <a><Link to="/">Préstamos</Link></a>
                </li>

                <li>
                    <a><Link to="/proyectos" >Proyectos</Link></a>
                </li>

                <li>
                    <a><Link to="/categorias">Categorias</Link></a>
                </li>

                <li>
                    <a><Link to="/grupos-elementos">Referencias</Link></a>
                </li>

                <li>
                    <a><Link to="/elementos">Elementos</Link></a>
                </li>
            </ul>
            <div class="profileImage">
                <div id="profileImage">
                    {initials}
                </div>
                <li class="user-links">
                    <ul class="user-menu">
                        <li>
                            {name}
                        </li>
                        <li>
                            <a class="salir" onClick={handleLogout}> Cerrar sesión </a>
                        </li>
                    </ul>
                </li>
            </div>


        </header>
    )
}
