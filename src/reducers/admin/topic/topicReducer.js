import { types } from "../../../types/types";

const initialState = {
    topics: [],
    currentMethodology: {},
    students: [],
    currentTopic: {},
    loading: false,
    loadingMethodology: false
}

export const topicReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.topicLoad:
            return {
                ...state,
                loading: true
            }
        
        case types.topicStop:
            return {
                ...state,
                loading: false
            }
            
        case types.topicsList:
            return {
                ...state,
                topics: [...action.payload]
            }

        case types.currentTopicNew:
            return {
                ...state,
                currentTopic: action.payload
            }

        case types.currentTopicRemove:
            return {
                ...state,
                currentTopic: {}
            }

        case types.topicUpdate:
            return {
                ...state,
                topics: state.topics.map( topic => (
                    topic.id === action.payload.id
                        ? action.payload
                        : topic
                ))
            }

        case types.topicsRemove:
            return {
                ...state,
                topics: []
            }

        case types.topicBlock:
            return {
                ...state,
                topics: state.topics.map(
                    topic => topic.id === action.payload.id
                        ? action.payload
                        : topic
                )
            }
        
        case types.topicDelete:
            return {
                ...state,
                topics: state.topics.filter(
                    topic => topic.id !== action.payload
                )
            }

        case types.topicsDelete:
            return {
                ...state,
                topics: state.topics.filter( 
                    topic => !action.payload.includes(topic.id)
                )
            }

        case types.topicStudentsList:
            return {
                ...state,
                students: [...action.payload]
            }

        case types.topicStudentsRemove:
            return {
                ...state,
                students: []
            }
        
        case types.topicStudentsUpdate:
            return {
                ...state,
                students: state.students.filter( 
                    student => !action.payload.includes(student.id)
                )
            }

        case types.currentMethodologyNew:
        return {
            ...state,
            currentMethodology: action.payload
        }

        case types.currentMethodologyRemove:
        return {
            ...state,
            currentMethodology: {}
        }

        case types.currentMethodologyLoad:
            return {
                ...state,
                loadingMethodology: true,
            }

        case types.currentMethodologyStop:
            return {
                ...state,
                loadingMethodology: false
            }
    
        default:
            return state;
    }

}
