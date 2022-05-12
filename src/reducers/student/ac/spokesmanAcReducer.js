import { acRolesTypes } from "../../../types/acRolesTypes"

const initialState = {
  spokesmanQuestions: [],
  spokesmanActivitiesDescription: [],
  spokesmanPerformanceDescription: {},
  loadingSpokesmanQuestion: false,
  loadingSpokesmanActivityDescription: false,
  loadingSpokesmanPerformanceDescription: false,
}

export const spokesmanAcReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acRolesTypes.acSpokesmanQuestionLoad:
      return {
        ...state,
        loadingSpokesmanQuestion: true
      }

    case acRolesTypes.acSpokesmanQuestionStop:
      return {
        ...state,
        loadingSpokesmanQuestion: false
      }

    case acRolesTypes.acSpokesmanQuestionList:
      return {
        ...state,
        spokesmanQuestions: [...action.payload]
      }

    case acRolesTypes.acSpokesmanQuestionRemove:
      return {
        ...state,
        spokesmanQuestions: []
      }

    case acRolesTypes.acSpokesmanQuestionNew:
      return {
        ...state,
        spokesmanQuestions: [ ...state.spokesmanQuestions, ...action.payload ]
      }

    case acRolesTypes.acSpokesmanQuestionBlock:
      return {
        ...state,
        spokesmanQuestions: state.spokesmanQuestions.filter( 
          data => data?.question.id !== action.payload
        )
      }

    case acRolesTypes.acActivityDescriptionSpokesmanLoad:
      return {
        ...state,
        loadingSpokesmanActivityDescription: true
      }

    case acRolesTypes.acActivityDescriptionSpokesmanStop:
      return {
        ...state,
        loadingSpokesmanActivityDescription: false
      }

    case acRolesTypes.acActivityDescriptionSpokesmanList:
      return {
        ...state,
        spokesmanActivitiesDescription: [ ...action.payload ]
      }

    case acRolesTypes.acActivityDescriptionSpokesmanRemove:
      return {
        ...state,
        spokesmanActivitiesDescription: []
      }

    case acRolesTypes.acActivityDescriptionSpokesmanNew:
      return {
        ...state,
        spokesmanActivitiesDescription: [ 
          ...state.spokesmanActivitiesDescription, action.payload 
        ]
      }

    case acRolesTypes.acActivityDescriptionSpokesmanBlock:
      return {
        ...state,
        spokesmanActivitiesDescription: state.spokesmanActivitiesDescription.filter( 
          data => data.id !== action.payload
        )
      }
    
    case acRolesTypes.acPerformanceDescriptionSpokesmanLoad:
      return {
        ...state,
        loadingSpokesmanPerformanceDescription: true
      }

    case acRolesTypes.acPerformanceDescriptionSpokesmanStop:
      return {
        ...state,
        loadingSpokesmanPerformanceDescription: false
      }

    case acRolesTypes.acPerformanceDescriptionSpokesmanList:
      return {
        ...state,
        spokesmanPerformanceDescription: {...action.payload }
      }

    case acRolesTypes.acPerformanceDescriptionSpokesmanRemove:
      return {
        ...state,
        spokesmanPerformanceDescription: {}
      }

    case acRolesTypes.acPerformanceDescriptionSpokesmanNew:
      return {
        ...state,
        spokesmanPerformanceDescription: { ...action.payload }
      }
    
    default:
      return state;
  }
}