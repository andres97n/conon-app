import { abpStepsTypes } from "../../../types/abpStepsTypes";

const initialState = {
    opinionStepOneAbp: [],
    opinionsTeamAbp: [],
    opinionsCount: 0,
    loadingOpinionStepOneAbp: false
}

export const opinionStepOneAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.opinionStepOneList:
            return {
                ...state,
                opinionStepOneAbp: [...action.payload]
            }

        case abpStepsTypes.opinionStepOneRemove:
            return {
                ...state,
                opinionStepOneAbp: []
            }

        case abpStepsTypes.opinionStepOneNew:
            return {
                ...state,
                opinionStepOneAbp: [...state.opinionStepOneAbp, action.payload]
            }
            
        case abpStepsTypes.opinionStepOneUpdate:
            return {
                ...state,
                opinionStepOneAbp: state.opinionStepOneAbp.map(
                    opinion => opinion.id === action.payload.id
                        ? action.payload
                        : opinion
                )
            }

        case abpStepsTypes.opinionStepOneBlock:
            return {
                ...state,
                opinionStepOneAbp: state.opinionStepOneAbp.filter(
                    opinion => opinion.id !== action.payload
                )
            }
        
        case abpStepsTypes.opinionStepOneLoad:
            return {
                ...state,
                loadingOpinionStepOneAbp: true
            }

        case abpStepsTypes.opinionStepOneStop:
            return {
                ...state,
                loadingOpinionStepOneAbp: false
            }
        
        case abpStepsTypes.interactionStepOneList:
            return {
                ...state,
                opinionsTeamAbp: [...action.payload]
            }

        case abpStepsTypes.interactionStepOneRemove:
            return {
                ...state,
                opinionsTeamAbp: []
            }

        case abpStepsTypes.interactionStepOneUpdate:
            return {
                ...state,
                opinionsTeamAbp: state.opinionsTeamAbp.filter(
                    data => data.opinion.id === action.payload.opinion.id
                        ? action.payload
                        : data
                )
            }

        case abpStepsTypes.opinionStepOneNewCount:
            return {
                ...state,
                opinionsCount: action.payload
            }

        case abpStepsTypes.opinionStepOneRemoveCount:
            return {
                ...state,
                opinionsCount: 0
            }

        default:
            return state;
    }
}
