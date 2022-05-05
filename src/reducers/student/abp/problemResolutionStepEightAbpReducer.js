import { abpStepsTypes } from "../../../types/abpStepsTypes"

const initialState = {
    currentProblemResolutionAbp: [],
    loadingProblemResolutionAbp: false,
}

export const problemResolutionStepEightAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.problemResolutionStepEightLoad:
            return {
                ...state,
                loadingProblemResolutionAbp: true
            }

        case abpStepsTypes.problemResolutionStepEightStop:
            return {
                ...state,
                loadingProblemResolutionAbp: false
            }

        case abpStepsTypes.problemResolutionStepEightList:
            return {
                ...state,
                currentProblemResolutionAbp: [...action.payload]
            }
    
        case abpStepsTypes.problemResolutionStepEightRemove:
            return {
                ...state,
                currentProblemResolutionAbp: []
            }

        case abpStepsTypes.problemResolutionStepEightNew:
            return {
                ...state,
                currentProblemResolutionAbp: [ 
                    ...state.currentProblemResolutionAbp,  action.payload 
                ]
            }

        case abpStepsTypes.problemResolutionStepEightUpdate:
            return {
                ...state,
                currentProblemResolutionAbp: state.currentProblemResolutionAbp.filter(
                    data => data.id === action.payload.id
                        ? (action.payload)
                        : (data)
                )
            }

        default:
            return state;
    }
}

