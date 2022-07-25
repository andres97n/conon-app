import { types } from "../../../types/types"


const initialState = {
    admins: [],
    loading: false
}

export const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.adminLoad:
            return {
                ...state,
                loading: true
            }

        case types.adminStop:
            return {
                ...state,
                loading: false
            }

        case types.adminList:
            return {
                ...state,
                admins: [ ...action.payload ]
        }

        case types.adminRemove:
            return {
                ...state,
                admins: []
            }

        case types.adminNew:
            return {
                ...state,
                admins: [ ...state.admins, action.payload ]
            }
            
        case types.adminUpdate:
            return {
                ...state,
                admins: state.admins.map(
                    admin => admin.id === action.payload.id
                        ? action.payload
                        : admin
                )
            }

        case types.adminDelete:
            return {
                ...state,
                admins: state.admins.filter(
                    admin => admin.id !== action.payload
                )
            }

        default:
            return state;
    }

}