import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { schoolReducer } from './schoolReducer';
import { uiReducer } from './uiReducer';
// import { dashboardReducer } from './dashboardReducer';
// import { studentRootReducer } from './student/studentRootReducer';
// import { teacherRootReducer } from './teacher/teacherRootReducer';
// import { adminRootReducer } from './admin/adminRootReducer';

// TODO: Terminar en admin dashboard el menú desasignaciones

// const initialState = {
//     auth: authReducer,
//     ui: uiReducer,
//     dashboard: {}
// }

// window.rolLogeado = "docente"
// let dashboard = localStorage.getItem('dashboardReducer');
// if (dashboard === "admin") {
//     dashboard = adminRootReducer;
// } else if (dashboard === "teacher") {
//     dashboard = teacherRootReducer;
// } else if (dashboard === "student") {
//     dashboard = studentRootReducer;
// } else {
//     dashboard = {}
// }

// const rol = {
//     username:"",
//     rol:"docente",
//     meta:{

//     }
// }

export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    dashboard: schoolReducer
    // dashboard: dashboard,
    // dashboard: dashboardReducer
    // dashboard: studentRootReducer,
    // dashboard: adminRootReducer
    // dashboard: teacherRootReducer
});



// const dashboardRootReducer = ( state, action ) => {
//     const intermediateState = rootReducer(state, action)
//     const finalState = dashboardReducer(intermediateState, action)
//     return finalState;
// }