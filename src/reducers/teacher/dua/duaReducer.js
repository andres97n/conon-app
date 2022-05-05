import { methodologyTypes } from "../../../types/methodologyTypes"


const initialState = {
    duaList: [],
    students: [],
    currentDua: {},
    loading: false,
}

export const duaReducer = (state = initialState, action) => {
    switch (action.type) {

        case methodologyTypes.duaList:
            return {
                ...state,
                duaList: [...action.payload]
            }

        case methodologyTypes.duaRemove:
            return {
                ...state,
                duaList: []
            }
        
        case methodologyTypes.duaNew:
            return {
                ...state,
                currentDua: action.payload
            }

        case methodologyTypes.currentDuaRemove:
            return {
                ...state,
                currentDua: {}
            }
            
        case methodologyTypes.duaUpdate:
            return {
                ...state,
                duaList: state.duaList.map(
                    dua => dua.id === action.payload.id
                        ? action.payload
                        : dua
                )
            }

        case methodologyTypes.duaDelete:
            return {
                ...state,
                duaList: state.duaList.filter(
                    dua => dua.id !== action.payload
                )
            }
        
        case methodologyTypes.duaLoad:
            return {
                ...state,
                loading: true
            }

        case methodologyTypes.duaStop:
            return {
                ...state,
                loading: false
            }

        case methodologyTypes.duaDetailList:
            return {
                ...state,
                students: [...action.payload]
            }

        case methodologyTypes.duaDetailRemove:
            return {
                ...state,
                students: []
            }

        case methodologyTypes.duaDetailNew:
            return {
                ...state,
                students: [action.payload, ...state.students]
            }

        case methodologyTypes.duaDetailDelete:
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