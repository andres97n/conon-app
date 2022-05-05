import { methodologyTypes } from "../../../types/methodologyTypes";

const initialState = {
    activities: [],
    questions: [],
    currentActivity: [],
    loadingActivity: false
}

export const activityReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case methodologyTypes.activityList:
            return {
                ...state,
                activities: [...action.payload]
            }

        case methodologyTypes.activityRemove:
            return {
                ...state,
                activities: []
            }

        case methodologyTypes.activityNew:
            return {
                ...state,
                currentActivity: [{ activity: action.payload, questions: [] }]
            }
            
        case methodologyTypes.activityUpdate:
            return {
                ...state,
                activities: state.activities.map(
                    activity => activity.id === action.payload.id
                        ? action.payload
                        : activity
                )
            }

        case methodologyTypes.activityDelete:
            return {
                ...state,
                activities: state.activities.filter(
                    activity => activity.id !== action.payload
                )
            }
        
        case methodologyTypes.activityLoad:
            return {
                ...state,
                loadingActivity: true
            }

        case methodologyTypes.activityStop:
            return {
                ...state,
                loadingActivity: false
            }
        
        case methodologyTypes.activityDetailList:
            return {
                ...state,
                students: [...action.payload]
            }

        case methodologyTypes.activityDetailRemove:
            return {
                ...state,
                students: []
            }

        case methodologyTypes.activityDetailNew:
            return {
                ...state,
                currentActivity: state.currentActivity.map( data => ({
                    ...data,
                    questions: [ ...data.questions, action.payload ]
                }))
            }
            
        case methodologyTypes.activityDetailUpdate:
            return {
                ...state,
                questions: state.questions.map(
                    question => question.id === action.payload.id
                        ? action.payload
                        : question
                )
            }

        case methodologyTypes.activityDetailDelete:
            return {
                ...state,
                questions: state.questions.filter(
                    question => question.id !== action.payload
                )
            }

        case methodologyTypes.activityCurrentList:
            return {
                ...state,
                currentActivity: [ ...action.payload ]
            }

        case methodologyTypes.activityCurrentRemove:
            return {
                ...state,
                currentActivity: []
            }
    
        default:
            return state;
    }
}