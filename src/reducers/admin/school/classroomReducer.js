import { types } from "../../../types/types";

const initialState = {
    classrooms: [],
    school_periods: [],
    students:[],
    loading: false
}

export const classroomReducer = ( state = initialState, action ) => {

    switch (action.type) {
       
        case types.classroomsList:
            return {
                ...state,
                classrooms: [...action.payload]
            }

        case types.classroomsRemove:
            return {
                ...state,
                classrooms: []
            }

        case types.classroomNew:
            return {
                ...state,
                classrooms: [
                    action.payload,
                    ...state.classrooms
                ]
            }
            
        case types.classroomUpdate:
            return {
                ...state,
                classrooms: state.classrooms.map(
                    classroom => classroom.id === action.payload.id
                        ? action.payload
                        : classroom
                )
            }

        case types.classroomDelete:
            return {
                ...state,
                classrooms: state.classrooms.filter(
                    classroom => classroom.id !== action.payload
                )
            }
        
        case types.classroomsDelete:
            return {
                ...state,
                classrooms: state.classrooms.filter( 
                    classroom => !action.payload.includes(classroom.id)
                )
            }

        case types.classroomLoad:
            return {
                ...state,
                loading: true
            }

        case types.classroomStop:
            return {
                ...state,
                loading: false
            }

        case types.classroomSchoolPeriodList:
            return {
                ...state,
                school_periods: [...action.payload]
            }

        case types.classroomSchoolPeriodRemove:
            return {
                ...state,
                school_periods: []
            }

        case types.classroomDetailList:
            return {
                ...state,
                students: [...action.payload]
            }

        case types.classroomDetailRemove:
            return {
                ...state,
                students: []
            }
        
        case types.classroomDetailUpdate:
            return {
                ...state,
                students: state.students.filter( 
                    student => !action.payload.includes(student.id)
                )
            }

        case types.classroomDetailDelete:
            return {
                ...state,
                students: state.students.filter( 
                    student => !action.payload.includes(student.id)
                )
            }
            
        default:
            return state;
    }

}