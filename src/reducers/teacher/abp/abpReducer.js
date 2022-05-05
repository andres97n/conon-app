import { methodologyTypes } from "../../../types/methodologyTypes";

const initialState = {
    abpList: [],
    currentAbp: {},
    loading: false
}

export const abpReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case methodologyTypes.abpList:
            return {
                ...state,
                abpList: [...action.payload]
            }

        case methodologyTypes.abpRemove:
            return {
                ...state,
                abpList: []
            }

        case methodologyTypes.abpNew:
            return {
                ...state,
                currentAbp: action.payload 
            }

        case methodologyTypes.currentAbpRemove:
            return {
                ...state,
                currentAbp: {}
            }
            
        case methodologyTypes.abpUpdate:
            return {
                ...state,
                abpList: state.abpList.map(
                    abp => abp.id === action.payload.id
                        ? action.payload
                        : abp
                )
            }

        case methodologyTypes.abpDelete:
            return {
                ...state,
                abpList: state.abpList.filter(
                    abp => abp.id !== action.payload
                )
            }
        
        case methodologyTypes.abpLoad:
            return {
                ...state,
                loading: true
            }

        case methodologyTypes.abpStop:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}