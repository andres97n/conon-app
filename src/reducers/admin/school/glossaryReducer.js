import { types } from "../../../types/types"

const initialState = {
    glossaries: [],
    glossaries_detail: [],
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
                glossaries: [...action.payload]
            }

        case types.glossariesRemove:
            return {
                ...state,
                glossaries: []
            }

        case types.glossaryNew:
            return {
                ...state,
                glossaries: [
                    action.payload,
                    ...state.glossaries
                ]
            }
            
        case types.glossaryUpdate:
            return {
                ...state,
                glossaries: state.glossaries.map(
                    glossary => glossary.id === action.payload.id
                        ? action.payload
                        : glossary
                )
            }

        case types.glossaryDelete:
            return {
                ...state,
                glossaries: state.glossaries.filter(
                    glossary => glossary.id !== action.payload
                )
            }

        case types.glossariesDetailList:
            return {
                ...state,
                glossaries_detail: [...action.payload]
            }

        case types.glossariesDetailRemove:
            return {
                ...state,
                glossaries_detail: []
            }

        case types.glossaryDetailUpdate:
            return {
                ...state,
                glossaries_detail: state.glossaries_detail.map(
                    glossary_detail => glossary_detail.id === action.payload.id
                        ? action.payload
                        : glossary_detail
                )
            }

        case types.glossaryDetailDelete:
            return {
                ...state,
                glossaries_detail: state.glossaries_detail.filter(
                    glossary_detail => glossary_detail.id !== action.payload
                )
            }
        
        case types.glossariesDetailDelete:
            return {
                ...state,
                glossaries_detail: state.glossaries_detail.filter( 
                    glossary_detail => !action.payload.includes(glossary_detail.id)
                )
            }
    
        default:
            return state;
    }
}