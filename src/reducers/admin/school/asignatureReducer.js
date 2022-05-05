import { types } from "../../../types/types";

const initialState = {
    asignatures: [],
    asignatures_detail: [],
    areas: [],
    teachers: [],
    classrooms: [],
    loading: false
}

export const asignatureReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.asignaturesList:
            return {
                ...state,
                asignatures: [...action.payload]
            }

        case types.asignatureRemove:
            return {
                ...state,
                asignatures: []
            }

        case types.asignatureNew:
            return {
                ...state,
                asignatures: [
                    action.payload,
                    ...state.asignatures
                ]
            }
            
        case types.asignatureUpdate:
            return {
                ...state,
                asignatures: state.asignatures.map(
                    asignature => asignature.id === action.payload.id
                        ? action.payload
                        : asignature
                )
            }

        case types.asignatureDelete:
            return {
                ...state,
                asignatures: state.asignatures.filter(
                    asignature => asignature.id !== action.payload
                )
            }
        
        case types.asignaturesDelete:
            return {
                ...state,
                asignatures: state.asignatures.filter( 
                    asignature => !action.payload.includes(asignature.id)
                )
            }

        case types.asignatureLoad:
            return {
                ...state,
                loading: true
            }

        case types.asignatureStop:
            return {
                ...state,
                loading: false
            }

        case types.asignatureAreaList:
            return {
                ...state,
                areas: [...action.payload]
            }

        case types.asignatureAreaRemove:
            return {
                ...state,
                areas: []
            }

        case types.asignatureClassroomList:
            return {
                ...state,
                classrooms: [...action.payload]
            }

        case types.asignatureClassroomRemove:
            return {
                ...state,
                classrooms: []
            }

        case types.asignatureTeacherList:
            return {
                ...state,
                teachers: [...action.payload]
            }

        case types.asignatureTeacherRemove:
            return {
                ...state,
                teachers: []
            }

        case types.asignaturesDetailList:
            return {
                ...state,
                asignatures_detail: [...action.payload]
            }

        case types.asignaturesDetailRemove:
            return {
                ...state,
                asignatures_detail: []
            }

        case types.asignatureDetailNew:
            return {
                ...state,
                asignatures_detail: [
                    action.payload,
                    ...state.asignatures_detail
                ]
            }

        case types.asignatureDetailDelete:
            return {
                ...state,
                asignatures_detail: state.asignatures_detail.filter(
                    asignature_detail => asignature_detail.id !== action.payload
                )
            }

        default:
            return state;
    }

}