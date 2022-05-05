import { acMethodologyTypes } from "../../../types/acMethodologyTypes"

const initialState = {
  acList: [],
  currentAc: {},
  loadingAc: false,
}

export const acReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acMethodologyTypes.acLoad:
      return {
        ...state,
        loadingAc: true
      }

    case acMethodologyTypes.acStop:
      return {
        ...state,
        loadingAc: false
      }

    case acMethodologyTypes.acList:
      return {
        ...state,
        acList: [...action.payload]
      }

    case acMethodologyTypes.acRemove:
      return {
        ...state,
        acList: []
      }
    
    case acMethodologyTypes.acNew:
      return {
        ...state,
        currentAc: action.payload
      }

    case acMethodologyTypes.currentAcRemove:
      return {
        ...state,
        currentAc: {}
      }

    case acMethodologyTypes.acUpdate:
      return {
        ...state,
        acList: state.acList.map(
          ac => ac.id === action.payload.id
            ? action.payload
            : ac
        )
      }

    case acMethodologyTypes.acBlock:
      return {
        ...state,
        acList: state.acList.filter(
          ac => ac.id !== action.payload
        )
      }
  
    default:
      return state;
  }
}