import { methodologyTypes } from "../../../types/methodologyTypes";

const initialState = {
    abpTeams: [],
    currentTeam: [],
    loadingTeamAbp: false
}

export const teamAbpReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case methodologyTypes.teamAbpList:
            return {
                ...state,
                abpTeams: [...action.payload]
            }

        case methodologyTypes.teamAbpRemove:
            return {
                ...state,
                abpTeams: []
            }

        case methodologyTypes.teamAbpNew:
            return {
                ...state,
                currentTeam: [{ team_abp: action.payload, students: [] }]
            }
            
        case methodologyTypes.teamAbpUpdate:
            return {
                ...state,
                abpTeams: state.abpTeams.map(
                    team => team.id === action.payload.id
                        ? action.payload
                        : team
                )
            }

        case methodologyTypes.teamAbpDelete:
            return {
                ...state,
                abpTeams: state.abpTeams.filter(
                    team => team.id !== action.payload
                )
            }
        
        case methodologyTypes.teamAbpLoad:
            return {
                ...state,
                loadingTeamAbp: true
            }

        case methodologyTypes.teamAbpStop:
            return {
                ...state,
                loadingTeamAbp: false
            }
    
        case methodologyTypes.teamDetailAbpList:
            return {
                ...state,
                currentTeam: [...action.payload]
            }

        case methodologyTypes.teamDetailAbpRemove:
            return {
                ...state,
                currentTeam: []
            }

        case methodologyTypes.teamDetailAbpNew:
            return {
                ...state,
                currentTeam: state.currentTeam.map( data => ({
                    ...data,
                    students : [ ...data.students, action.payload ]
                }))
            }
            
        case methodologyTypes.teamDetailAbpUpdate:
            return {
                ...state,
                currentTeam: [ ...state.currentTeam, action.payload ]
            }

        case methodologyTypes.teamAbpNextStep:
            return {
                ...state,
                currentTeam: state.currentTeam.map(
                    data => ({
                        ...data,
                        step: action.payload
                    })
                )
            }

        // case methodologyTypes.teamDetailAbpBlock:
        //     return {
        //         ...state,
        //         currentTeam: state.currentTeam.map(
        //             student => student.id === action.payload.id
        //                 ? action.payload
        //                 : student
        //         )
        //     }

        default:
            return state;
    
    }
}