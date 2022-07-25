import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import PrimeReact from 'primereact/api';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../../styles/flags/flags.css';

import { NavbarScreen } from '../shared/NavbarScreen';
import { FooterScreen } from '../shared/FooterScreen';
import { SideNavigation } from '../shared/SideNavigation';
import { OwnerScreen } from '../admin/owner/OwnerScreen';
import { StudentScreen } from '../admin/student/StudentScreen';
import { TeacherScreen } from '../admin/teacher/TeacherScreen';
import { KnowledgeAreaScreen } from '../admin/knowledge-area/KnowledgeAreaScreen';
import { AsignatureScreen } from '../admin/asignature/AsignatureScreen';
import { SchoolPeriodScreen } from '../admin/school-period/SchoolPeriodScreen';
import { ClassroomScreen } from '../admin/classroom/ClassroomScreen';
import { AssignKnowledgeArea } from '../admin/asignations/AssignKnowledgeArea';
import { AssignAsignature } from '../admin/asignations/AssignAsignature';
import { AssingClassroom } from '../admin/asignations/AssingClassroom';
import { 
    DeallocationKnowledgeAreaScreen 
} from '../admin/deallocations/DeallocationKnowledgeAreaScreen';
import { DTBlockClassroomDetail } from '../teacher/classroom/DTBlockClassroomDetail';


export const AdminDashboardScreen = () => {

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
                label: 'Dashboard', icon: 'fas fa-home', to: '/'
            }]
        },
        {
            label: 'Usuarios', icon: 'pi pi-fw pi-sitemap',
            items: [
                {label: 'Administradores', icon: 'fas fa-user-lock', to: '/admin'},
                {label: 'Docentes', icon: 'fas fa-chalkboard-teacher', to: '/teacher'},
                {label: 'Estudiantes', icon: 'fas fa-user-graduate', to: '/student'}
            ]
        },
        {
            label: 'Institución', icon: 'pi pi-fw pi-clone',
            items: [
                {label: 'Períodos Lectivos', icon: 'fas fa-school', to: '/school-period'},
                {label: 'Áreas de Conocimiento', icon: 'fas fa-book', to: '/area'},
                {label: 'Asignaturas', icon: 'fas fa-book-reader', to: '/asignature'},
                {label: 'Aulas', icon: 'fas fa-chalkboard', to: '/classroom'},
                {label: 'Asignaciones', icon: 'fas fa-hand-pointer', 
                    items: [
                        {
                            label: 'Áreas de Conocimiento', 
                            icon: 'fas fa-book', 
                            to:'/assignment/assign-area'
                        },
                        {
                            label: 'Asignaturas', 
                            icon: 'fas fa-book-reader', 
                            to: '/assign-asignature'
                        },
                        {
                            label: 'Aulas', 
                            icon: 'fas fa-chalkboard', 
                            to: '/assign-classroom'
                        },
                    ]
                },
                {label: 'Denegaciones', icon: 'fas fa-ban', 
                    items: [
                        {
                            label: 'Áreas de Conocimiento', 
                            icon: 'fas fa-book',
                            to: '/denials/area'
                        },
                        {
                            label: 'Aulas', 
                            icon: 'fas fa-chalkboard', 
                            to: '/denials/classroom'
                        },
                    ]
                },
            ]
        },
    ];

    return (
        <div className={wrapperClass} 
            onClick={onWrapperClick}
        >
            <NavbarScreen 
                onToggleMenuClick={onToggleMenuClick} 
                layoutColorMode={'light'}
                mobileTopbarMenuActive={mobileTopbarMenuActive} 
                onMobileTopbarMenuClick={onMobileTopbarMenuClick} 
                onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
            />
            <div 
                className="layout-sidebar" 
                onClick={onSidebarClick}
            >
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
                        path="/dashboard-admin"
                        component={AdminDashboardScreen}
                    />
                    <Route
                        exact
                        path="/admin"
                        component={OwnerScreen}
                    />
                    <Route
                        exact
                        path="/teacher"
                        component={TeacherScreen}
                    />
                    <Route
                        exact
                        path="/student"
                        component={StudentScreen}
                    />
                    <Route
                        exact
                        path="/school-period"
                        component={SchoolPeriodScreen}
                    />
                    <Route
                        exact
                        path="/area"
                        component={KnowledgeAreaScreen}
                    />
                    <Route
                        exact
                        path="/asignature"
                        component={AsignatureScreen}
                    />
                    <Route
                        exact
                        path="/classroom"
                        component={ClassroomScreen}
                    />
                    <Route
                        exact
                        path="/assignment/assign-area"
                        component={AssignKnowledgeArea}
                    />
                    <Route
                        exact
                        path="/assign-asignature"
                        component={AssignAsignature}
                    />
                    <Route
                        exact
                        path="/assign-classroom"
                        component={AssingClassroom}
                    />
                    <Route
                        exact
                        path="/denials/area"
                        component={DeallocationKnowledgeAreaScreen}
                    />
                    <Route
                        exact
                        path="/denials/classroom"
                        component={DTBlockClassroomDetail}
                    />
                </div>
                <FooterScreen layoutColorMode={'light'}/>
            </div>
            {/* <AppConfig
                rippleEffect={ripple} 
                onRippleEffect={onRipple}  
                inputStyle={inputStyle} 
                onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} 
                onLayoutModeChange={onLayoutModeChange} 
                layoutColorMode={layoutColorMode} 
                onColorModeChange={onColorModeChange} 
            /> */}
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
