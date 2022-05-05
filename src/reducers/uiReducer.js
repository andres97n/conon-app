import { types } from "../types/types";

const initialState = {
    isError: false,
    detail: '',
    schoolPeriod: {},
    uiLoading: false,
    messageCount: 0,
    speedList: [],
    uiUser: {}
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.newError:
            return {
                ...state,
                isError: true
            }

        case types.removeError:
            return {
                ...state,
                isError: false
            }
    
        case types.newMessage:
            return {
                ...state,
                isError: action.payload
            }

        case types.removeMessage:
            return {
                ...state,
                isError: ''
            }

        case types.setSchoolPeriod:
            return {
                ...state,
                schoolPeriod: action.payload
            }

        case types.removeSchoolPeriod:
            return {
                ...state,
                schoolPeriod: {}
            }
        case types.uiLoad:
            return {
                ...state,
                uiLoading: true
            }

        case types.uiStop:
            return {
                ...state,
                uiLoading: false
            }

        case types.uiMessagesList:
            return {
                ...state,
                messageCount: action.payload
            }    

        case types.uiMessagesRemove:
            return {
                ...state,
                messageCount: 0
            }

        case types.uiSpeedDialList:
            return {
                ...state,
                speedList: [ ...state.speedList, action.payload ]
            }

        case types.uiSpeedDialRemove:
            return {
                ...state,
                speedList: []
            }

        case types.uiSetChangeUserPass:
            return {
                ...state,
                uiUser: { ...action.payload }
            }
        case types.uiRemoveChangeUserPass:
            return {
                ...state,
                uiUser: {}
            }

        default:
            return state;
    }

}