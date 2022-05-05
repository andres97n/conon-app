import { methodologyTypes } from "../../../types/methodologyTypes";

// TODO: Limpiar los reducers de Rubric y utilizar su propio reducer

const initialState = {
    evaluationsAbp: [],
    evaluationDetailAbp:[],
    loadingEvaluationAbp: false,
    // evaluation: [],
}

export const evaluationAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case methodologyTypes.evaluationAbpLoad:
            return {
                ...state,
                loadingEvaluationAbp: true
            }

        case methodologyTypes.evaluationAbpStop:
            return {
                ...state,
                loadingEvaluationAbp: false
            }

        case methodologyTypes.evaluationAbpList:
            return {
                ...state,
                evaluationsAbp: [...action.payload]
            }

        case methodologyTypes.evaluationAbpRemove:
            return {
                ...state,
                evaluationsAbp: []
            }
    
        case methodologyTypes.evaluationAbpNew:
            return {
                ...state,
                evaluationDetailAbp: state.evaluationDetailAbp.map( data => ({
                    ...data,
                    evaluation: { ...action.payload }
                }))
            }
            
        case methodologyTypes.evaluationAbpUpdate:
            return {
                ...state,
                evaluationDetailAbp: state.evaluationDetailAbp.map( data => ({
                    ...data,
                    evaluation: data.evaluation.id === action.payload.id
                        ? { ...action.payload }
                        : data.evaluation
                }))
            }

        case methodologyTypes.evaluationAbpDelete:
            return {
                ...state,
                evaluationsAbp: state.evaluationsAbp.filter(
                    evaluationAbp => evaluationAbp.id !== action.payload
                )
            }

        case methodologyTypes.evaluationDetailAbpList:
            return {
                ...state,
                evaluationDetailAbp: [...action.payload]
            }

        case methodologyTypes.evaluationDetailAbpRemove:
            return {
                ...state,
                evaluationDetailAbp: []
            }
    
        case methodologyTypes.evaluationDetailAbpNew:
            return {
                ...state,
                evaluationDetailAbp: state.evaluationDetailAbp.map( data => ({
                    ...data,
                    details: [ ...data.details, action.payload ]
                }))
            }
        
        case methodologyTypes.evaluationDetailAbpBlock:
            return {
                ...state,
                evaluationDetailAbp: state.evaluationDetailAbp.map( data => ({
                    ...data,
                    details: data.details.filter( 
                        detail => detail.id !== action.payload 
                    )
                }))
            }

        // case methodologyTypes.rubricDetailAbpList:
        //     return {
        //         ...state,
        //         evaluation: [...action.payload]
        //     }

        // case methodologyTypes.rubricDetailAbpRemove:
        //     return {
        //         ...state,
        //         evaluation: []
        //     }

        // case methodologyTypes.rubricDetailAbpNew:
        //     return {
        //         ...state,
        //         evaluation: [action.payload, ...state.evaluation]
        //     }
            
        // case methodologyTypes.rubricDetailAbpUpdate:
        //     return {
        //         ...state,
        //         evaluation: state.evaluation.map(
        //             section => section.id === action.payload.id
        //                 ? action.payload
        //                 : section
        //         )
        //     }

        default:
            return state;

    }
}