import { types } from "../../../types/types"

const initialState = {
    teachers: [],
    loading: false
}

export const teacherReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.teacherList:
            return {
                ...state,
                teachers: [...action.payload]
            }

        case types.teacherRemove:
            return {
                ...state,
                teachers: []
            }

        case types.teacherNew:
            return {
                ...state,
                teachers: [
                    action.payload,
                    ...state.teachers
                ]
            }
            
        case types.teacherUpdate:
            return {
                ...state,
                teachers: state.teachers.map(
                    teacher => teacher.id === action.payload.id
                        ? action.payload
                        : teacher
                )
            }

        case types.teacherDelete:
            return {
                ...state,
                teachers: state.teachers.filter(
                    teacher => teacher.id !== action.payload
                )
            }
        
        case types.teachersDelete:
            return {
                ...state,
                teachers: state.teachers.filter( 
                    teacher => !action.payload.includes(teacher.id)
                )
            }

        case types.teacherLoad:
            return {
                ...state,
                loading: true
            }

        case types.teacherStop:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }

}
