import { abpStepsTypes } from "../../../types/abpStepsTypes";

const initialState = {
    currentTeamLearnedConcepts: [],
    loadingTeamLearnedConcepts: false,
}

export const learnedConceptStepThreeAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.learnedConceptStepThreeList:
            return {
                ...state,
                currentTeamLearnedConcepts: [...action.payload]
            }
    
        case abpStepsTypes.learnedConceptStepThreeRemove:
            return {
                ...state,
                currentTeamLearnedConcepts: []
            }

        case abpStepsTypes.learnedConceptStepThreeNew:
            return {
                ...state,
                currentTeamLearnedConcepts: [
                    ...state.currentTeamLearnedConcepts, 
                    {
                        learned_concept: action.payload,
                        references: []
                    }
                ]
            }
    
        case abpStepsTypes.learnedConceptStepThreeBlock:
            return {
                ...state,
                currentTeamLearnedConcepts: state.currentTeamLearnedConcepts.filter(
                    concept => concept.learned_concept.id !== action.payload
                )
            }

        case abpStepsTypes.learnedConceptStepThreeLoad:
            return {
                ...state,
                loadingTeamLearnedConcepts: true
            }

        case abpStepsTypes.learnedConceptStepThreeStop:
            return {
                ...state,
                loadingTeamLearnedConcepts: false
            }

        case abpStepsTypes.learnedConceptReferenceStepThreeNew:
            return {
                ...state,
                currentTeamLearnedConcepts: state.currentTeamLearnedConcepts.map(
                    data => data.learned_concept.id === action.payload.learnedConceptAbpId
                        ? {
                            ...data,
                            references: [
                                ...data.references,
                                action.payload.learnedConceptReferenceAbp
                            ],
                        }
                        : data
                )
            }

        case abpStepsTypes.learnedConceptReferenceStepThreeBlock:
            return {
                ...state,
                currentTeamLearnedConcepts: state.currentTeamLearnedConcepts.map(
                    data => data.learned_concept.id === action.payload.learnedConceptAbpId
                        ? {
                            ...data,
                            references: data.references.filter(
                                reference => 
                                reference.id !== action.payload.learnedConceptReferenceAbpId
                            )
                        }
                        : data
                )
            }
    
        default:
            return state;
    }
}