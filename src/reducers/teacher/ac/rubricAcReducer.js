import { acMethodologyTypes } from "../../../types/acMethodologyTypes"

const initialState = {
  rubricsAc: [],
  currentRubric: [],
  loadingRubricAc: false,
  loadingRubricDetailAc: false,
}

export const rubricAcReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acMethodologyTypes.rubricAcLoad:
      return {
        ...state,
        loadingRubricAc: true
      }

    case acMethodologyTypes.rubricAcStop:
      return {
        ...state,
        loadingRubricAc: false
      }

    case acMethodologyTypes.rubricAcList:
      return {
        ...state,
        rubricsAc: [...action.payload]
      }

    case acMethodologyTypes.rubricAcRemove:
      return {
        ...state,
        rubricsAc: []
      }

    case acMethodologyTypes.rubricAcNew:
      return {
        ...state,
        currentRubric: [{ rubric_ac: action.payload, details: [] }]
      }

    case acMethodologyTypes.rubricAcUpdate:
      return {
        ...state,
        rubricsAc: state.rubricsAc.map( rubric => 
          rubric === action.payload.id
            ? action.payload
            : rubric
        )
      }

    case acMethodologyTypes.rubricAcBlock:
      return {
        ...state,
        rubricsAc: state.rubricsAc.filter(
          rubric => rubric.id !== action.payload
        )
      }

    case acMethodologyTypes.rubricDetailAcLoad:
      return {
        ...state,
        loadingRubricDetailAc: true
      }

    case acMethodologyTypes.rubricDetailAcStop:
      return {
        ...state,
        loadingRubricDetailAc: false
      }

    case acMethodologyTypes.rubricDetailAcList:
      return {
        ...state,
        currentRubric: [ ...action.payload ]
      }

    case acMethodologyTypes.rubricDetailAcRemove:
      return {
        ...state,
        currentRubric: []
      }
    
    case acMethodologyTypes.rubricDetailAcNew:
      return {
        ...state,
        currentRubric: state.currentRubric.map( data => ({
          ...data,
          details: [ ...data.details, action.payload ]
        }))
      }

    case acMethodologyTypes.rubricDetailAcUpdate:
    return {
      ...state,
      currentRubric: state.currentRubric.map( rubricDetail => 
        rubricDetail === action.payload.id
          ? action.payload
          : rubricDetail
      )
    }

    case acMethodologyTypes.rubricDetailAcBlock:
      return {
        ...state,
        currentRubric: state.currentRubric.filter(
          teamDetail => teamDetail.id !== action.payload
        )
      }

    default:
      return state;
  }
}