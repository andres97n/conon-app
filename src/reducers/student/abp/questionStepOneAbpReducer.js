import { abpStepsTypes } from "../../../types/abpStepsTypes"

const initialState = {
    questionsStepOneAbp: [],
    questionsCount: 0,
    loadingQuestionStepOneAbp: false
}

export const questionStepOneAbpReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case abpStepsTypes.questionStepOneList:
            return {
                ...state,
                questionsStepOneAbp: [...action.payload]
            }

        case abpStepsTypes.questionStepOneRemove:
            return {
                ...state,
                questionsStepOneAbp: []
            }

        case abpStepsTypes.questionStepOneNew:
            return {
                ...state,
                questionsStepOneAbp: [...state.questionsStepOneAbp, action.payload, ]
            }

        case abpStepsTypes.questionStepOneBlock:
            return {
                ...state,
                questionsStepOneAbp: state.questionsStepOneAbp.filter(
                    question => question.id !== action.payload
                )
            }
        
        case abpStepsTypes.questionStepOneLoad:
            return {
                ...state,
                loadingQuestionStepOneAbp: true
            }

        case abpStepsTypes.questionStepOneStop:
            return {
                ...state,
                loadingQuestionStepOneAbp: false
            }
    
        default:
            return state;
    }
} 