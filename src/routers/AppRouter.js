import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { LabRegister } from '../components/laboratorios/labRegister';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const {checking, uid} = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    console.log(checking)
    console.log(uid)
    if(checking){
        return <h5>Espere...</h5>
    }

    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute 
                            exact 
                            path="/login" 
                            component={ LoginScreen }
                            isAuthenticated={ !!uid}
                        />
                        <PrivateRoute 
                            exact 
                            path="/" 
                            component={ CalendarScreen }
                            isAuthenticated={ !!uid}
                        />
                        <PrivateRoute 
                            exact 
                            path="/laboratorios" 
                            component={ LabRegister}
                            isAuthenticated={ !!uid}
                        />

                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
