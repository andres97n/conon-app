import { abpStepsTypes } from "../../../types/abpStepsTypes";

const initialState = {
    currentProblemDefinition: [],
    loadingProblemDefinition: false,
}

export const problemDefinitionStepSixAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.problemDefinitionStepSixLoad:
            return {
                ...state,
                loadingProblemDefinition: true
            }

        case abpStepsTypes.problemDefinitionStepSixStop:
            return {
                ...state,
                loadingProblemDefinition: false
            }

        case abpStepsTypes.problemDefinitionStepSixList:
            return {
                ...state,
                currentProblemDefinition: [...action.payload]
            }
    
        case abpStepsTypes.problemDefinitionStepSixRemove:
            return {
                ...state,
                currentProblemDefinition: []
            }

        case abpStepsTypes.problemDefinitionStepSixNew:
            return {
                ...state,
                currentProblemDefinition: state.currentProblemDefinition.map(
                    data => ({
                        ...data,
                        problem_definition: action.payload
                    })
                )
            }

        case abpStepsTypes.problemDefinitionStepSixUpdate:
            return {
                ...state,
                currentProblemDefinition: state.currentProblemDefinition.filter(
                    data => data.problem_definition.id === action.payload.id
                        ? ({
                            ...data,
                            problem_definition: action.payload
                        })
                        : (
                            data
                        )
                )
            }
    
        case abpStepsTypes.problemDefinitionStepSixBlock:
            return {
                ...state,
                currentProblemDefinition: state.currentProblemDefinition.filter(
                    data => data.problem_definition.id !== action.payload
                )
            }

        case abpStepsTypes.problemDefinitionReferenceStepSixNew:
            return {
                ...state,
                currentProblemDefinition: state.currentProblemDefinition.map( data => ({
                    ...data,
                    references: [ ...data.references, action.payload ]
                }))
            }

        case abpStepsTypes.problemDefinitionReferenceStepSixBlock:
            return {
                ...state,
                currentProblemDefinition: state.currentProblemDefinition.map( data => ({
                    ...data,
                    references: data.references.filter(
                        reference => reference.id !== action.payload
                    )
                }))
            }
    
        default:
            return state;
    }
}