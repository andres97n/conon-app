import { abpStepsTypes } from "../../../types/abpStepsTypes"

const initialState = {
    currentGetInformationModel: [],
    loadingGetInformationModel: false,
}

export const getInformationStepSevenAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case abpStepsTypes.getInformationStepSevenLoad:
            return {
                ...state,
                loadingGetInformationModel: true
            }

        case abpStepsTypes.getInformationStepSevenStop:
            return {
                ...state,
                loadingGetInformationModel: false
            }

        case abpStepsTypes.getInformationStepSevenList:
            return {
                ...state,
                currentGetInformationModel: [...action.payload]
            }
    
        case abpStepsTypes.getInformationStepSevenRemove:
            return {
                ...state,
                currentGetInformationModel: []
            }

        case abpStepsTypes.getInformationStepSevenNew:
            return {
                ...state,
                currentGetInformationModel: state.currentGetInformationModel.map(
                    data => ({
                        ...data,
                        information: action.payload
                    })
                )
            }

        case abpStepsTypes.getInformationStepSevenUpdate:
            return {
                ...state,
                currentGetInformationModel: state.currentGetInformationModel.filter(
                    data => data.information.id === action.payload.id
                        ? ({
                            ...data,
                            information: action.payload
                        })
                        : (
                            data
                        )
                )
            }

        case abpStepsTypes.informationReferenceStepSevenNew:
            return {
                ...state,
                currentGetInformationModel: state.currentGetInformationModel.map( data => ({
                    ...data,
                    references: [ ...data.references, action.payload ]
                }))
            }

        case abpStepsTypes.informationReferenceStepSevenBlock:
            return {
                ...state,
                currentGetInformationModel: state.currentGetInformationModel.map( data => ({
                    ...data,
                    references: data.references.filter(
                        reference => reference.id !== action.payload
                    )
                }))
            }
    
        default:
            return state;
    }
}
