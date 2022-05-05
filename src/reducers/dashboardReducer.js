import { types } from "../types/types";
import { adminRootReducer } from "./admin/adminRootReducer";
import { studentRootReducer } from "./student/studentRootReducer";
import { teacherRootReducer } from "./teacher/teacherRootReducer";

const initialState = {}

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.dashboardAdmin:
            return adminRootReducer;

        case types.dashboardTeacher:
            return teacherRootReducer;
    
        case types.dashboardStudent:
            return studentRootReducer
        
        default:
            return state;
    }

}
