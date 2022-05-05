import { abpStepsTypes } from "../../../types/abpStepsTypes";

const initialState = {
    currentPerformActions: [],
    ratingPerformActions: [],
    loadingPerformAction: false,
    loadingRatePerformAction: false
}

export const performActionStepFiveAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.performActionStepFiveList:
            return {
                ...state,
                currentPerformActions: [...action.payload]
            }
    
        case abpStepsTypes.performActionStepFiveRemove:
            return {
                ...state,
                currentPerformActions: []
            }

        case abpStepsTypes.performActionStepFiveNew:
            return {
                ...state,
                currentPerformActions: [...state.currentPerformActions, action.payload]
            }
    
        case abpStepsTypes.performActionStepFiveBlock:
            return {
                ...state,
                currentPerformActions: state.currentPerformActions.filter(
                    data => data.id !== action.payload
                )
            }

        case abpStepsTypes.performActionStepFiveLoad:
            return {
                ...state,
                loadingPerformAction: true
            }

        case abpStepsTypes.performActionStepFiveStop:
            return {
                ...state,
                loadingPerformAction: false
            }

        case abpStepsTypes.ratePerformActionStepFiveList:
            return {
                ...state,
                ratingPerformActions: [...action.payload]
            }

        case abpStepsTypes.ratePerformActionStepFiveRemove:
            return {
                ...state,
                ratingPerformActions: []
            }

        case abpStepsTypes.ratePerformActionStepFiveUpdate:
            return {
                ...state,
                ratingPerformActions: state.ratingPerformActions.filter(
                    data => data.perform_action.id === action.payload.performActionId
                        ? {
                            ...data,
                            rates: data.rates.filter(
                                rate => 
                                rate.id === action.payload.ratePerformActionId
                                 ? action.payload.ratePerformAction
                                 : rate
                            )
                        }
                        : data
                )
            }
    
        case abpStepsTypes.ratePerformActionStepFiveLoad:
            return {
                ...state,
                loadingRatePerformAction: true
            }

        case abpStepsTypes.ratePerformActionStepFiveStop:
            return {
                ...state,
                loadingRatePerformAction: false
            }

        default:
            return state;
    }
}