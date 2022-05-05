import { abpStepsTypes } from "../../../types/abpStepsTypes"

const initialState = {
  answersStepOneAbp: [],
  loadingAnswersAbp: false
}

export const answerStepOneAbpReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case abpStepsTypes.answerStepOneLoad:
      return {
        ...state,
        loadingAnswersAbp: true
      }

    case abpStepsTypes.answerStepOneStop:
      return {
        ...state,
        loadingAnswersAbp: false
      }

    case abpStepsTypes.answerStepOneList:
      return {
        ...state,
        answersStepOneAbp: [ ...state.answersStepOneAbp, ...action.payload ]
      }

    case abpStepsTypes.answerStepOneRemove:
      return {
        ...state,
        answersStepOneAbp: []
      }
  
    case abpStepsTypes.answerStepOneNew:
      return {
          ...state,
          answersStepOneAbp: [ ...state.answersStepOneAbp, action.payload ]
      }

    case abpStepsTypes.answerStepOneBlock:
      return {
        ...state,
        answersStepOneAbp: state.answersStepOneAbp.filter(
          answer => answer.id !== action.payload
        )
      }

    default:
      return state;
  }
}