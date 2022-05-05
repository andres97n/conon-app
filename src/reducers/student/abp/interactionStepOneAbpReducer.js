import { abpStepsTypes } from "../../../types/abpStepsTypes";

const initialState = {
    interactionStepOneAbp: [],
    loadingInteractionStepOneAbp: false
}

export const interactionStepOneAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {
        
        // case abpStepsTypes.interactionStepOneList:
        //     return {
        //         ...state,
        //         interactionStepOneAbp: [...action.payload]
        //     }

        // case abpStepsTypes.opinionStepOneRemove:
        //     return {
        //         ...state,
        //         interactionStepOneAbp: []
        //     }

        // case abpStepsTypes.interactionStepOneNew:
        //     return {
        //         ...state,
        //         interactionStepOneAbp: [action.payload, ...state.interactionStepOneAbp]
        //     }

        // case abpStepsTypes.interactionStepOneUpdate:
        //     return {
        //         ...state,
        //         interactionStepOneAbp: state.interactionStepOneAbp.map(
        //             interaction => interaction.id === action.payload.id
        //                 ? action.payload
        //                 : interaction
        //         )
        //     }

        // case abpStepsTypes.interactionStepOneBlock:
        //     return {
        //         ...state,
        //         interactionStepOneAbp: state.interactionStepOneAbp.filter(
        //             interaction => interaction.id === action.payload
        //                 ? { active: false, ...interaction }
        //                 : interaction
        //         )
        //     }
        
        // case abpStepsTypes.opinionStepOneLoad:
        //     return {
        //         ...state,
        //         loadingInteractionStepOneAbp: true
        //     }

        // case abpStepsTypes.opinionStepOneStop:
        //     return {
        //         ...state,
        //         loadingInteractionStepOneAbp: false
        //     }
    
        default:
            return state;
    }
}
