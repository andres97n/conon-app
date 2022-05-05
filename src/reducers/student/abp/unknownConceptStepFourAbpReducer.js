import { abpStepsTypes } from "../../../types/abpStepsTypes"

const initialState = {
    currentTeamUnknownConcepts: [],
    loadingTeamUnknownConcepts: false,
}

export const unknownConceptStepFourAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.unknownConceptStepFourList:
            return {
                ...state,
                currentTeamUnknownConcepts: [...action.payload]
            }
    
        case abpStepsTypes.unknownConceptStepFourRemove:
            return {
                ...state,
                currentTeamUnknownConcepts: []
            }

        case abpStepsTypes.unknownConceptStepFourNew:
            return {
                ...state,
                currentTeamUnknownConcepts: [
                    ...state.currentTeamUnknownConcepts, 
                    {
                        unknown_concept: action.payload,
                        references: []
                    }
                ]
            }
    
        case abpStepsTypes.unknownConceptStepFourBlock:
            return {
                ...state,
                currentTeamUnknownConcepts: state.currentTeamUnknownConcepts.filter(
                    concept => concept.unknown_concept.id !== action.payload
                )
            }

        case abpStepsTypes.unknownConceptStepFourLoad:
            return {
                ...state,
                loadingTeamUnknownConcepts: true
            }

        case abpStepsTypes.unknownConceptStepFourStop:
            return {
                ...state,
                loadingTeamUnknownConcepts: false
            }

        case abpStepsTypes.unknownConceptReferenceStepFourNew:
            return {
                ...state,
                currentTeamUnknownConcepts: state.currentTeamUnknownConcepts.map(
                    data => data.unknown_concept.id === action.payload.unknownConceptAbpId
                        ? {
                            ...data,
                            references: [
                                ...data.references,
                                action.payload.unknownConceptReferenceAbp
                            ],
                        }
                        : data
                )
            }

        case abpStepsTypes.unknownConceptReferenceStepFourBlock:
            return {
                ...state,
                currentTeamUnknownConcepts: state.currentTeamUnknownConcepts.map(
                    data => data.unknown_concept.id === action.payload.unknownConceptAbpId
                        ? {
                            ...data,
                            references: data.references.filter(
                                reference => 
                                reference.id !== action.payload.unknownConceptReferenceAbpId
                            )
                        }
                        : data
                )
            }
    
        default:
            return state;
    }
}