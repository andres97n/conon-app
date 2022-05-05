import { methodologyTypes } from "../../../types/methodologyTypes";

const initialState = {
    rubrics: [],
    currentRubric: [],
    loadingRubricAbp: false
}

export const rubricAbpRuducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case methodologyTypes.rubricAbpList:
            return {
                ...state,
                rubrics: [...action.payload]
            }

        case methodologyTypes.rubricAbpRemove:
            return {
                ...state,
                rubrics: []
            }
        
        case methodologyTypes.rubricAbpNew:
            return {
                ...state,
                currentRubric: [{ rubric_abp: action.payload, details: [] }]
            }
            
        case methodologyTypes.rubricAbpUpdate:
            return {
                ...state,
                rubrics: state.rubrics.map(
                    rubric => rubric.id === action.payload.id
                        ? action.payload
                        : rubric
                )
            }

        case methodologyTypes.rubricAbpDelete:
            return {
                ...state,
                rubrics: state.rubrics.filter(
                    rubric => rubric.id !== action.payload
                )
            }
        
        case methodologyTypes.rubricAbpLoad:
            return {
                ...state,
                loadingRubricAbp: true
            }

        case methodologyTypes.rubricAbpStop:
            return {
                ...state,
                loadingRubricAbp: false
            }

        case methodologyTypes.rubricDetailAbpList:
            return {
                ...state,
                currentRubric: [...action.payload]
            }

        case methodologyTypes.rubricDetailAbpRemove:
            return {
                ...state,
                currentRubric: []
            }

        case methodologyTypes.rubricDetailAbpNew:
            return {
                ...state,
                currentRubric: state.currentRubric.map( data => ({
                    ...data,
                    details: [ ...data.details, action.payload ]
                }))
            }
            
        case methodologyTypes.rubricDetailAbpUpdate:
            return {
                ...state,
                currentRubric: state.currentRubric.map(
                    section => section.id === action.payload.id
                        ? action.payload
                        : section
                )
            }

        // case methodologyTypes.rubricDetailAbpBlock:
        //     return {
        //         ...state,
        //         currentRubric: state.currentRubric.map(
        //             section => section.id === action.payload.id
        //                 ? action.payload
        //                 : section
        //         )
        //     }
    
        default:
            return state;
    }
}