import { methodologyTypes } from "../../../types/methodologyTypes";

const initialState = {
    studentActivities: [],
    answers: [],
    currentStudentActivity: [],
    loadingStudentActivity: false,
    existsCurrentStudentActivity: false,
}

export const studentActivityReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case methodologyTypes.studentActivityList:
            return {
                ...state,
                currentStudentActivity: [...action.payload]
            }

        case methodologyTypes.studentActivityRemove:
            return {
                ...state,
                currentStudentActivity: []
            }

        case methodologyTypes.studentActivityNew:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    ...data,
                    activity_student: { ...action.payload }
                }))
            }
            
        case methodologyTypes.studentActivityUpdate:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map(
                    data => data.activity_student.id === action.payload.id
                        ? {
                            ...data,
                            activity: { ...action.payload }
                        }
                        : data
                )
            }

        case methodologyTypes.studentActivityBlock:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    activity: {},
                    questions: []
                }))
            }
        
        case methodologyTypes.studentActivityLoad:
            return {
                ...state,
                loadingStudentActivity: true
            }

        case methodologyTypes.studentActivityStop:
            return {
                ...state,
                loadingStudentActivity: false
            }

        case methodologyTypes.studentActivityDetailList:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    ...data,
                    answers: [ ...action.payload ]
                }))
            }

        case methodologyTypes.studentActivityDetailRemove:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    ...data,
                    answers: []
                }))
            }

        case methodologyTypes.studentActivityDetailNew:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    ...data,
                    answers: [ ...data.answers, ...action.payload ]
                }))
            }
            
        case methodologyTypes.studentActivityDetailUpdate:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    ...data,
                    answers: data.answers.map( question => 
                        question.id === action.payload.id
                            ? action.payload
                            : question  
                    )
                }))
            }

        case methodologyTypes.studentActivityDetailBlock:
            return {
                ...state,
                currentStudentActivity: state.currentStudentActivity.map( data => ({
                    ...data,
                    answers: data.answers.filter( 
                        question => question !== action.payload 
                    )
                }))
            }

        case methodologyTypes.studentActivitySetActive:
            return {
                ...state,
                existsCurrentStudentActivity: true
            }

        case methodologyTypes.studentActivitySetInactive:
            return {
                ...state,
                existsCurrentStudentActivity: false
            }

        default:
            return state;
    }
}