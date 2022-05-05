import React from 'react';
import { useSelector } from 'react-redux';
import {
    HashRouter,
} from "react-router-dom";

import ScrollToTop from '../components/dashboard/ScrollToTop';
import { AdminDashboardScreen } from '../components/dashboard/AdminDashboardScreen';
import { TeacherDashboardScreen } from '../components/dashboard/TeacherDashboardScreen';
import { StudentDashboardScreen } from '../components/dashboard/StudentDashboardScreen';
import { NotFoundPage } from '../components/ui/NotFoundPage';

export const CononRouter = () => {

    const { type } = useSelector(state => state.auth);
    // const [open, setOpen] = useState(false);

    // const toggleMenu = () => {
    //     setOpen(!open)
    // }

    return (

        <HashRouter >
            <ScrollToTop>
                {
                    (type === 0)
                        ? (<AdminDashboardScreen></AdminDashboardScreen>)
                        : (type === 1)
                            ? (<TeacherDashboardScreen></TeacherDashboardScreen>)
                            : (type === 2)
                                ? (<StudentDashboardScreen></StudentDashboardScreen>)
                                : (<NotFoundPage />)
                }
            </ScrollToTop>
        </HashRouter>

        // <Container fluid>
        //     <Row>
        //         <NavbarScreen 
        //             open={open}
        //             toggleMenu={toggleMenu}
        //         />
        //     </Row>
        //     <Row className='conon-body'>
        //         <Col md={2} className='sidebar-body'>
        //             <SideNavigation open={open}/>
        //         </Col>
        //         <Col md={10}>
        //             <Switch>
        //                 <Route
        //                     exact
        //                     path="/dashboard"
        //                     component={DashboardScreen}
        //                 />
        //                 <Redirect to="/dashboard" />
        //             </Switch>
        //         </Col>
        //     </Row>
        // </Container>
        
    )

}