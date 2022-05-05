import { types } from "../types/types";

const initialState = {
    checking: true,
    isUsernameValid: false
}


export const authReducer = (state=initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                ...action.payload,
                checking: false
            };

        case types.checkingFinish:
            return {
                ...state,
                checking: false
            }
    
        case types.logout:
            return {
                checking: false
            }
        
        case types.setIsUsernameValid:
            return {
                isUsernameValid: true
        }
        case types.clearIsUsernameValid:
            return {
                isUsernameValid: false
        }

        default:
            return state;
    }

}