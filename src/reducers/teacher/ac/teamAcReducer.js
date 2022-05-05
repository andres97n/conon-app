import { acMethodologyTypes } from "../../../types/acMethodologyTypes"

const initialState = {
  acTeams: [],
  currentTeam: [],
  userAc: {},
  isTeamFinished: 1,
  loadingTeamAc: false,
  loadingTeamDetailAc: false,
}

export const teamAcReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acMethodologyTypes.teamAcLoad:
      return {
        ...state,
        loadingTeamAc: true
      }

    case acMethodologyTypes.teamAcStop:
      return {
        ...state,
        loadingTeamAc: false
      }

    case acMethodologyTypes.teamAcList:
      return {
        ...state,
        acTeams: [...action.payload]
      }

    case acMethodologyTypes.teamAcRemove:
      return {
        ...state,
        acTeams: []
      }
    
    case acMethodologyTypes.teamAcNew:
      return {
        ...state,
        currentTeam: [{ team_ac: action.payload, details: [] }]
      }

    case acMethodologyTypes.teamAcBlock:
      return {
        ...state,
        acTeams: state.acTeams.filter(
          team => team.id !== action.payload
        )
      }

    case acMethodologyTypes.teamDetailAcLoad:
      return {
        ...state,
        loadingTeamDetailAc: true
      }

    case acMethodologyTypes.teamDetailAcStop:
      return {
        ...state,
        loadingTeamDetailAc: false
      }

    case acMethodologyTypes.teamDetailAcList:
      return {
        ...state,
        currentTeam: [ ...action.payload ]
      }

    case acMethodologyTypes.teamDetailAcRemove:
      return {
        ...state,
        currentTeam: []
      }
    
    case acMethodologyTypes.teamDetailAcNew:
      return {
        ...state,
        currentTeam: state.currentTeam.map( data => ({
          ...data,
          details: [ ...data.details, action.payload ]
        }))
      }

    case acMethodologyTypes.teamDetailAcBlock:
      return {
        ...state,
        currentTeam: state.currentTeam.filter(
          teamDetail => teamDetail.id !== action.payload
        )
      }

    case acMethodologyTypes.teamDetailAcUserNew:
      return {
        ...state,
        userAc: { ...action.payload }
      }

    case acMethodologyTypes.teamDetailAcUserRemove:
      return {
        ...state,
        userAc: {}
      }

    case acMethodologyTypes.teamAcSetFinished:
      return {
        ...state,
        isTeamFinished: 0
      }

    case acMethodologyTypes.teamAcRemoveFinished:
      return {
        ...state,
        isTeamFinished: 1
      }
  
    default:
      return state;
  }
}