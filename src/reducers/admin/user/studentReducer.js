import { types } from "../../../types/types"


const initialState = {
    students: [],
    loading: false
}

export const studentReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.studentList:
            return {
                ...state,
                students: [...action.payload]
            }

        case types.studentRemove:
            return {
                ...state,
                students: []
            }

        case types.studentNew:
            return {
                ...state,
                students: [
                    action.payload,
                    ...state.students
                ]
            }
            
        case types.studentUpdate:
            return {
                ...state,
                students: state.students.map(
                    student => student.id === action.payload.id
                        ? action.payload
                        : student
                )
            }

        case types.studentDelete:
            return {
                ...state,
                students: state.students.filter(
                    student => student.id !== action.payload
                )
            }
        
        case types.studentsDelete:
            return {
                ...state,
                students: state.students.filter( 
                    student => !action.payload.includes(student.id)
                )
            }

        case types.studentLoad:
            return {
                ...state,
                loading: true
            }

        case types.studentStop:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }

}