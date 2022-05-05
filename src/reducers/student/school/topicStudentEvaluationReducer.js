import { types } from "../../../types/types";

const initialState = {
    currentStudentEvaluations: [],
    loadingStudentEvaluation: false
};

export const topicStudentEvaluationReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.topicStudentEvaluationLoad:
            return {
                ...state,
                loadingStudentEvaluation: true
            };
    
        case types.topicStudentEvaluationStop:
            return {
                ...state,
                loadingStudentEvaluation: false
            };

        case types.topicStudentEvaluationList:
            return {
                ...state,
                currentStudentEvaluations: [ ...action.payload ]
            };

        case types.topicStudentEvaluationRemove:
            return {
                ...state,
                currentStudentEvaluations: []
            };

        case types.topicStudentEvaluationNew:
            return {
                ...state,
                currentStudentEvaluations: [ ...state.currentStudentEvaluations, action.payload ]
            }

        case types.topicStudentEvaluationBlock:
            return {
                ...state,
                currentStudentEvaluations: state.currentStudentEvaluations.filter( 
                    data => data.id !== action.payload
                )
            }

        default:
            return state;
    }
};