import { acMethodologyTypes } from "../../../types/acMethodologyTypes"

const initialState = {
  evaluationsAc: [],
  evaluationDetailAc:[],
  loadingEvaluationAc: false,
  loadingEvaluationDetailAc: false,
}

export const evaluationAcReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acMethodologyTypes.evaluationAcLoad:
      return {
        ...state,
        loadingEvaluationAc: true
      }

    case acMethodologyTypes.evaluationAcStop:
      return {
        ...state,
        loadingEvaluationAc: false
      }

    case acMethodologyTypes.evaluationAcList:
      return {
        ...state,
        evaluationsAc: [...action.payload]
      }

    case acMethodologyTypes.evaluationAcRemove:
      return {
        ...state,
        evaluationsAc: []
      }
  
    case acMethodologyTypes.evaluationAcNew:
      return {
        ...state,
        evaluationDetailAc: state.evaluationDetailAc.map( data => ({
          ...data,
          evaluation: { ...action.payload }
        }))
      }

    case acMethodologyTypes.evaluationAcUpdate:
      return {
        ...state,
        evaluationDetailAc: state.evaluationDetailAc.map( 
          data => data.evaluation.id === action.payload.id 
            ? ({
              ...data,
              evaluation: { ...action.payload }
            })
            : data
        )
      }
  
    case acMethodologyTypes.evaluationAcBlock:
      return {
        ...state,
        evaluationsAc: state.evaluationsAc.filter(
          evaluation => evaluation.id !== action.payload
        )
      }
    
    case acMethodologyTypes.evaluationDetailAcLoad:
      return {
        ...state,
        loadingEvaluationDetailAc: true
      }

    case acMethodologyTypes.evaluationDetailAcStop:
      return {
        ...state,
        loadingEvaluationDetailAc: false
      }

    case acMethodologyTypes.evaluationDetailAcList:
      return {
        ...state,
        evaluationDetailAc: [...action.payload]
      }

    case acMethodologyTypes.evaluationDetailAcRemove:
      return {
        ...state,
        evaluationDetailAc: []
      }

    case acMethodologyTypes.evaluationDetailAcNew:
      return {
        ...state,
        evaluationDetailAc: state.evaluationDetailAc.map( data => ({
          ...data,
          details: [ ...data.details, action.payload ]
        }))
      }

    case acMethodologyTypes.evaluationDetailAcBlock:
      return {
        ...state,
        evaluationDetailAc: state.evaluationDetailAc.filter(
          evaluationDetail => evaluationDetail.id !== action.payload
        )
      }

    default:
      return state;
  }
}