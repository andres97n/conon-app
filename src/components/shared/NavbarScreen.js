import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';

import { startLogout } from '../../actions/auth';


export const NavbarScreen = (props) => {

    const dispatch = useDispatch();
    const { type } = useSelector(state => state.auth);
    let history = useHistory();

    const handleLogout = () => {
        dispatch( startLogout() );
    };

    const handleRedirectToComments = () => {
        const commentPath = '/comment';
        if (history.location.pathname !== commentPath) {
            history.push(commentPath);
        }
    };

    const handleRedirectToMessages = () => {
        const messagePath = '/message';
        if (history.location.pathname !== messagePath) {
            history.push(messagePath);
        }
    };

    return (
        <div className="layout-topbar" style={{backgroundColor: '#303335'}}>
            <Link to="/" className="layout-topbar-logo">
                <img 
                    src={
                        props.layoutColorMode === 'light' 
                            ? 'Conon.png' 
                            : 'Conon.png'
                        } 
                    alt="logo"
                />
            </Link>
            <button 
                type="button" 
                className="p-link layout-menu-button layout-topbar-button" 
                onClick={props.onToggleMenuClick}
            >
                <i className="fas fa-bars" />
            </button>
            <button 
                type="button" 
                className="p-link layout-topbar-menu-button layout-topbar-button" 
                onClick={props.onMobileTopbarMenuClick}
            >
                <i className="fas fa-ellipsis-v" />
            </button>
                <ul 
                className={classNames(
                    "layout-topbar-menu lg:flex origin-top", 
                    {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive }
                )}>
                    {
                        type !== 0 && (
                            <li>
                                <Tooltip target=".msg-button" />
                                <button 
                                    className="p-link layout-topbar-button msg-button" 
                                    data-pr-tooltip="Mensajes" 
                                    data-pr-position="bottom"
                                    onClick={handleRedirectToMessages}
                                >
                                    <i className="fas fa-envelope p-overlay-badge" />
                                    <span>Mensajes</span>
                                </button>
                            </li>
                        )
                    }
                    {
                        type !== 0 && (
                            <li>
                                <Tooltip target=".comment-button" />
                                <button 
                                    className="p-link layout-topbar-button comment-button" 
                                    data-pr-tooltip="Comentarios en Tópicos" 
                                    data-pr-position="bottom"
                                    onClick={handleRedirectToComments}
                                >
                                    <i className="fas fa-comments" />
                                    <span>Comentarios</span>
                                </button>
                            </li>
                        )
                    }
                    <li>
                        <Tooltip target=".end-button" />
                        <button
                            className="p-link layout-topbar-button end-button" 
                            data-pr-tooltip="Cerrar Sesión" 
                            data-pr-position="bottom"
                            onClick={handleLogout}
                        >
                            <i className="fas fa-sign-out-alt" />
                            <span>Salir</span>
                        </button>
                    </li>
                </ul>
        </div>
        
    )
}
