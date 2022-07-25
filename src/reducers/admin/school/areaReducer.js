import { types } from "../../../types/types";

const initialState = {
    areas: [],
    teachers: [],
    coordinators: [],
    loading: false
}

export const areaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.areaList:
            return {
                ...state,
                areas: [...action.payload]
            }

        case types.areaRemove:
            return {
                ...state,
                areas: []
            }

        case types.areaNew:
            return {
                ...state,
                areas: [
                    action.payload,
                    ...state.areas
                ]
            }
            
        case types.areaUpdate:
            return {
                ...state,
                areas: state.areas.map(
                    area => area.id === action.payload.id
                        ? action.payload
                        : area
                )
            }

        case types.areaDelete:
            return {
                ...state,
                areas: state.areas.filter(
                    area => area.id !== action.payload
                )
            }
        
        case types.areasDelete:
            return {
                ...state,
                areas: state.areas.filter( 
                    area => !action.payload.includes(area.id)
                )
            }

        case types.areaLoad:
            return {
                ...state,
                loading: true
            }

        case types.areaStop:
            return {
                ...state,
                loading: false
            }
        
        case types.coordinatorList:
            return {
                ...state,
                coordinators: [...action.payload]
            }

        case types.coordinatorRemove:
            return {
                ...state,
                coordinators: []
            }
        
        case types.areaTeacherList:
            return {
                ...state,
                teachers: [...action.payload]
            }    

        case types.areaTeacherUpdate:
            return {
                ...state,
                teachers: state.teachers.filter( 
                    teacher => !action.payload.includes(teacher.id)
                )
            }

        case types.areaTeacherDelete:
            return {
                ...state,
                teachers: state.teachers.filter( 
                    teacher => teacher.id !== action.payload
                )
            }

        case types.areaTeacherRemove:
            return {
                ...state,
                teachers: []
            }

        default:
            return state;
    }

}

