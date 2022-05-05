import { types } from "../types/types";

export const startLoadAdminData = () => ({
    type: types.dashboardAdmin,
    // payload: adminRootReducer
});

export const startLoadTeacherData = () => ({
    type: types.dashboardTeacher,
    // payload: teacherRootReducer
});

export const startLoadStudentData = () => ({
    type: types.dashboardStudent,
    // payload: studentRootReducer
});