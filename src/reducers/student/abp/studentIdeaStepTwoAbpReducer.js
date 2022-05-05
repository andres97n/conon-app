import { abpStepsTypes } from "../../../types/abpStepsTypes";

const initialState = {
    currentStudentIdeas: [],
    ratingStudentIdeas: [],
    loadingStudentIdea: false,
    loadingRateStudentIdea: false
}

export const studentIdeaStepTwoAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.studentIdeaStepTwoList:
            return {
                ...state,
                currentStudentIdeas: [...action.payload]
            }
    
        case abpStepsTypes.studentIdeaStepTwoRemove:
            return {
                ...state,
                currentStudentIdeas: []
            }

        case abpStepsTypes.studentIdeaStepTwoNew:
            return {
                ...state,
                currentStudentIdeas: [...state.currentStudentIdeas, action.payload]
            }
    
        case abpStepsTypes.studentIdeaStepTwoBlock:
            return {
                ...state,
                currentStudentIdeas: state.currentStudentIdeas.filter(
                    idea => idea.id !== action.payload
                )
            }
        
        case abpStepsTypes.studentIdeaStepTwoLoad:
            return {
                ...state,
                loadingStudentIdea: true
            }

        case abpStepsTypes.studentIdeaStepTwoStop:
            return {
                ...state,
                loadingStudentIdea: false
            }

        case abpStepsTypes.rateStudentIdeaStepTwoList:
            return {
                ...state,
                ratingStudentIdeas: [...action.payload]
            }
    
        case abpStepsTypes.rateStudentIdeaStepTwoRemove:
            return {
                ...state,
                ratingStudentIdeas: []
            }
    
        case abpStepsTypes.rateStudentIdeaStepTwoUpdate:
            return {
                ...state,
                ratingStudentIdeas: state.ratingStudentIdeas.filter(
                    data => data.student_idea.id === action.payload.student_idea.id
                        ? action.payload
                        : data
                )
            }

        case abpStepsTypes.rateStudentIdeaStepTwoLoad:
            return {
                ...state,
                loadingRateStudentIdea: true
            }

        case abpStepsTypes.rateStudentIdeaStepTwoStop:
            return {
                ...state,
                loadingRateStudentIdea: false
            }

        default:
            return state;
    }
}

