import { types } from "../../../types/types"

const initialState = {
    glossaries: [],
    glossaries_detail: [],
    currentGlossary: {},
    loading: true
}

export const glossaryReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        case types.glossaryLoad:
            return {
                ...state,
                loading: true
            }
        
        case types.glossaryStop:
            return {
                ...state,
                loading: false
            }
            
        case types.glossariesList:
            return {
                ...state,
                glossaries: [ ...action.payload ]
            }

        case types.glossariesRemove:
            return {
                ...state,
                glossaries: []
            }

        case types.glossaryNew:
            return {
                ...state,
                currentGlossary: { 
                    glossary: { ...action.payload },
                    details: state.currentGlossary.details
                }
            }

        case types.glossaryBlock:
            return {
                ...state,
                glossaries: state.glossaries.map(
                    glossary => glossary.id === action.payload.id
                        ? ({ ...action.payload })
                        : (glossary)
                )
            }

        case types.glossariesDetailList:
            return {
                ...state,
                glossaries_detail: [ ...action.payload ]
            }

        case types.glossariesDetailRemove:
            return {
                ...state,
                glossaries_detail: []
            }

        case types.glossariesDetailNew:
            return {
                ...state,
                currentGlossary: {
                    ...state.currentGlossary,
                    details: [ ...state.currentGlossary.details, action.payload ]
                }
            }

        case types.glossaryDetailBlock:
            return {
                ...state,
                currentGlossary: {
                    ...state.currentGlossary,
                    details: state.currentGlossary.details.map(
                        glossaryDetail => 
                        glossaryDetail.id === action.payload.id
                            ? (action.payload)
                            : (glossaryDetail)
                    )
                }
            }

        case types.glossaryDetailBlockByStudent:
            return {
                ...state,
                currentGlossary: {
                    ...state.currentGlossary,
                    details: state.currentGlossary.details.filter(
                        glossary_detail => glossary_detail.id !== action.payload
                    )
                }
            }

        case types.glossaryDetailDelete:
            return {
                ...state,
                currentGlossary: {
                    ...state.currentGlossary,
                    details: state.currentGlossary.details.filter(
                        glossary_detail => glossary_detail.id !== action.payload
                    )
                }
            }
        
        case types.glossariesDetailDelete:
            return {
                ...state,
                currentGlossary: {
                    ...state.currentGlossary,
                    details: state.currentGlossary.details.filter(
                        glossary_detail => !action.payload.includes(glossary_detail.id)
                    )
                }
            }

        case types.currentGlossaryList:
            return {
                ...state,
                currentGlossary: { ...action.payload }
            }

        case types.currentGlossaryRemove:
            return {
                ...state,
                currentGlossary: {}
            }
    
        default:
            return state;
    }
}