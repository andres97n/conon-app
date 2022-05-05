import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { CononRouter } from './CononRouter';
import { LoginScreen } from '../components/auth/LoginScreen';
import { startChecking } from "../actions/auth";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid, type } = useSelector( state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if ( checking ) {
        return (
            <div className='outer-ex'>
                <ProgressSpinner />
            </div>
            // <Spinner 
            //     animation="grow"
            //     className="position-absolute top-50 start-50 translate-middle"
            //     size="sm" 
            //     variant="dark"
            // />
        )
    }

    // TODO: Investigar sobre cómo establecer eficientemente los urls del FRONTEND
    //  Y hacer que el enlace esté acompañado de /#/

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path={
                            (type === 0)
                                ? ('/dashboard-admin')
                                : (type === 1)
                                    ? ('/dashboard-teacher')
                                    : (type === 2)
                                        ? ('/dashboard-student')
                                        : ('')
                        }
                        component={ CononRouter } 
                        isAuthenticated={ !!uid }
                    />

{/* TODO: Establecer una página de no se encuentra */}

                    <Redirect to={
                        (type === 0)
                        ? ('/dashboard-admin')
                        : (type === 1)
                            ? ('/dashboard-teacher')
                            : (type === 2)
                                ? ('/dashboard-student')
                                : ('')
                    }/>   
                </Switch>
            </div>
        </Router>
    )

}