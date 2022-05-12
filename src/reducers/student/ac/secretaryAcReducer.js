import { acRolesTypes } from "../../../types/acRolesTypes"

const initialState = {
  secretaryInformations: [],
  secretaryFeaturedInformations: [],
  secretaryTeacherAnswers: [],
  secretaryTeacherAnswerDescriptions: [],
  loadingSecretaryInformation: false,
  loadingSecretaryFeaturedInformation: false,
  loadingSecretaryTeacherAnswer: false,
  loadingSecretaryTeacherAnswerDescription: false,
}

export const secretaryAcReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acRolesTypes.acSecretaryInformationLoad:
      return {
        ...state,
        loadingSecretaryInformation: true
      }

    case acRolesTypes.acSecretaryInformationStop:
      return {
        ...state,
        loadingSecretaryInformation: false
      }

    case acRolesTypes.acSecretaryInformationList:
      return {
        ...state,
        secretaryInformations: [ ...action.payload ]
      }

    case acRolesTypes.acSecretaryInformationRemove:
      return {
        ...state,
        secretaryInformations: []
      }

    case acRolesTypes.acSecretaryInformationNew:
      return {
        ...state,
        secretaryInformations: [ ...state.secretaryInformations, ...action.payload ]
      }

    case acRolesTypes.acSecretaryInformationBlock:
      return {
        ...state,
        secretaryInformations: state.secretaryInformations.filter( 
          data => data.id !== action.payload
        )
      }
    case acRolesTypes.acFeaturedInformationSecretaryLoad:
      return {
        ...state,
        loadingSecretaryFeaturedInformation: true
      }

    case acRolesTypes.acFeaturedInformationSecretaryStop:
      return {
        ...state,
        loadingSecretaryFeaturedInformation: false
      }

    case acRolesTypes.acFeaturedInformationSecretaryList:
      return {
        ...state,
        secretaryFeaturedInformations: [ ...action.payload ]
      }

    case acRolesTypes.acFeaturedInformationSecretaryRemove:
      return {
        ...state,
        secretaryFeaturedInformations: []
      }

    case acRolesTypes.acFeaturedInformationSecretaryNew:
      return {
        ...state,
        secretaryFeaturedInformations: [ 
          ...state.secretaryFeaturedInformations, action.payload 
        ]
      }

    case acRolesTypes.acFeaturedInformationSecretaryBlock:
      return {
        ...state,
        secretaryFeaturedInformations: state.secretaryFeaturedInformations.filter( 
          data => data.id !== action.payload
        )
      }
    
    case acRolesTypes.acTeacherAnswerLoad:
      return {
        ...state,
        loadingSecretaryTeacherAnswer: true
      }

    case acRolesTypes.acTeacherAnswerStop:
      return {
        ...state,
        loadingSecretaryTeacherAnswer: false
      }

    case acRolesTypes.acTeacherAnswerList:
      return {
        ...state,
        secretaryTeacherAnswers: [ ...action.payload ]
      }

    case acRolesTypes.acTeacherAnswerRemove:
      return {
        ...state,
        secretaryTeacherAnswers: []
      }

    case acRolesTypes.acTeacherAnswerNew:
      return {
        ...state,
        secretaryTeacherAnswers: [ 
          ...state.secretaryTeacherAnswers, action.payload 
        ]
      }

    case acRolesTypes.acTeacherAnswerBlock:
      return {
        ...state,
        secretaryTeacherAnswers: state.secretaryTeacherAnswers.filter( 
          data => data.id !== action.payload
        )
      }

    case acRolesTypes.acTeacherAnswerDescriptionSecretaryLoad:
      return {
        ...state,
        loadingSecretaryTeacherAnswerDescription: true
      }

    case acRolesTypes.acTeacherAnswerDescriptionSecretaryStop:
      return {
        ...state,
        loadingSecretaryTeacherAnswerDescription: false
      }

    case acRolesTypes.acTeacherAnswerDescriptionSecretaryList:
      return {
        ...state,
        secretaryTeacherAnswerDescriptions: [...action.payload]
      }

    case acRolesTypes.acTeacherAnswerDescriptionSecretaryRemove:
      return {
        ...state,
        secretaryTeacherAnswerDescriptions: []
      }

    case acRolesTypes.acTeacherAnswerDescriptionSecretaryNew:
      return {
        ...state,
        secretaryTeacherAnswerDescriptions: [ 
          ...state.secretaryTeacherAnswerDescriptions, action.payload 
        ]
      }

    case acRolesTypes.acTeacherAnswerDescriptionSecretaryBlock:
      return {
        ...state,
        secretaryTeacherAnswerDescriptions: state.secretaryTeacherAnswerDescriptions.filter( 
          data => data.id !== action.payload
        )
      }

    default:
      return state;
  
  }
}