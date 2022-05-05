import { types } from "../../../types/types";

const initialState = {
    schoolPeriods: [],
    loading: false
}

export const schoolPeriodReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.schoolPeriodsList:
            return {
                ...state,
                schoolPeriods: [...action.payload]
            }

        case types.schoolPeriodsRemove:
            return {
                ...state,
                schoolPeriods: []
            }

        case types.schoolPeriodNew:
            return {
                ...state,
                schoolPeriods: [
                    action.payload,
                    ...state.schoolPeriods
                ]
            }
            
        case types.schoolPeriodUpdate:
            return {
                ...state,
                schoolPeriods: state.schoolPeriods.map(
                    schoolPeriod => schoolPeriod.id === action.payload.id
                        ? action.payload
                        : schoolPeriod
                )
            }

        case types.schoolPeriodDelete:
            return {
                ...state,
                schoolPeriods: state.schoolPeriods.filter(
                    schoolPeriod => schoolPeriod.id !== action.payload
                )
            }
        
        case types.schoolPeriodsDelete:
            return {
                ...state,
                schoolPeriods: state.schoolPeriods.filter( 
                    schoolPeriod => !action.payload.includes(schoolPeriod.id)
                )
            }

        case types.schoolPeriodLoad:
            return {
                ...state,
                loading: true
            }

        case types.schoolPeriodStop:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }

}