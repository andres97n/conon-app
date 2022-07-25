import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import PrimeReact from 'primereact/api';


import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../../styles/flags/flags.css';

import { NavbarScreen } from '../shared/NavbarScreen';
import { FooterScreen } from '../shared/FooterScreen';
import { SideNavigation } from '../shared/SideNavigation';

import { ToolMainScreen } from '../ui/tool/ToolMainScreen';
import { DTStudentScreen } from '../teacher/student/DTStudentScreen';
import { DTBlockClassroomDetail } from '../teacher/classroom/DTBlockClassroomDetail';
import { MethodologiesHelperScreen } from '../teacher/helper/MethodologiesHelperScreen';
import { NewTeacherTopicScreen } from '../teacher/content/topic/NewTeacherTopicScreen';
import { MessageScreen } from '../ui/message/MessageScreen';
import { TeacherTopicScreen } from '../teacher/topic/TeacherTopicScreen';
import { AssingClassroom } from '../admin/asignations/AssingClassroom';
import { GlossaryScreen } from '../admin/glossary/GlossaryScreen';
import { CommentScreen } from '../admin/comment/CommentScreen';


export const TeacherDashboardScreen = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }
        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;
        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if(mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
        setLayoutMode(oldState => (oldState));
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + 
            className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': true,
        'p-ripple-disabled': false,
        'layout-theme-light': true
    });

    const menu = [
        {
            label: 'Inicio',
            items: [{
                label: 'Dashboard', icon: 'fas fa-home icon-primary', to: '/'
            }]
        },
        {
            label: 'Contenido Educativo',
            items: [
                {
                    label: 'Nuevo Tema de Estudio', 
                    icon: 'fas fa-plus icon-primary', 
                    to:'/new-teacher-topic'
                }
            ]
        },
        {
            label: 'Guía',
            items: [
                {
                    label: 'Metodologías', 
                    icon: 'fas fa-info icon-primary', 
                    to: '/methodologies'
                },
            ]
        },
        {
            label: 'Institución', icon: 'pi pi-fw pi-clone',
            items: [
                {
                    label: 'Estudiantes', 
                    icon: 'fas fa-user-graduate icon-primary', 
                    to: '/student'
                },
                {
                    label: 'Asignaciones', icon: 'fas fa-hand-pointer icon-primary', 
                    items: [
                        {
                            label: 'Aulas', 
                            icon: 'fas fa-chalkboard icon-primary', 
                            to: '/assign-classroom'
                        },
                    ]
                },
                {
                    label: 'Desasignaciones', icon: 'fas fa-ban icon-primary', 
                    items: [
                        {
                            label: 'Aulas', 
                            icon: 'fas fa-chalkboard icon-primary', 
                            to: '/block-classroom-detail'
                        },
                    ]
                },
            ]
        },
        {
            label: 'Plantillas', icon: 'pi pi-fw pi-search',
            items: [
                {
                    label: 'Temas de Estudio', 
                    icon: 'fas fa-file-powerpoint icon-primary', 
                    to:'/topic'
                },
                {
                    label: 'Glosarios', 
                    icon: 'fas fa-spell-check icon-primary', 
                    to: '/glossary'
                },
                {
                    label: 'Comentarios', 
                    icon: 'fas fa-comment-alt icon-primary', 
                    to: '/comment'
                },
                {
                    label: 'Mensajes', 
                    icon: 'fas fa-envelope-open-text icon-primary', 
                    to: '/message'
                }
            ]
        },
    ];
      
    return (
        <div className={wrapperClass} 
            onClick={onWrapperClick}>
            <NavbarScreen 
                onToggleMenuClick={onToggleMenuClick} 
                layoutColorMode={'light'}
                mobileTopbarMenuActive={mobileTopbarMenuActive} 
                onMobileTopbarMenuClick={onMobileTopbarMenuClick} 
                onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
            />
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <SideNavigation 
                    model={menu} 
                    onMenuItemClick={onMenuItemClick} 
                    layoutColorMode={'light'} 
                />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">
                    <Route
                        exact
                        path="/dashboard-teacher"
                        component={TeacherDashboardScreen}
                    />
                    <Route
                        exact
                        path="/student"
                        component={DTStudentScreen}
                    />
                    <Route
                        exact
                        path="/assign-classroom"
                        component={AssingClassroom}
                    />
                    <Route
                        exact
                        path="/block-classroom-detail"
                        component={DTBlockClassroomDetail}
                    />
                    <Route
                        exact
                        path="/topic"
                        component={TeacherTopicScreen}
                    />
                    <Route
                        exact
                        path="/new-teacher-topic"
                        component={NewTeacherTopicScreen}
                    />
                    <Route
                        exact
                        path="/methodologies"
                        component={MethodologiesHelperScreen}
                    />
                    <Route
                        exact
                        path="/message"
                        component={MessageScreen}
                    />
                    <Route
                        exact
                        path="/glossary"
                        component={GlossaryScreen}
                    />
                    <Route
                        exact
                        path="/comment"
                        component={CommentScreen}
                    />
                </div>
                <ToolMainScreen />
                <FooterScreen layoutColorMode={'light'}/>
            </div>
            <CSSTransition 
                classNames="layout-mask" 
                timeout={{ enter: 200, exit: 200 }} 
                in={mobileMenuActive} 
                unmountOnExit
            >
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    )
}
