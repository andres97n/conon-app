import { acRolesTypes } from "../../../types/acRolesTypes"

const initialState = {
  organizerActions: [],
  organizerAssignActivities: [],
  organizerDescribeUnderstandingList: [],
  loadingOrganizerAction: false,
  loadingOrganizerAssignActivity: false,
  loadingOrganizerDescribeUnderstanding: false,
}

export const organizerAcReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case acRolesTypes.acOrganizerActionLoad:
      return {
        ...state,
        loadingOrganizerAction: true
      }

    case acRolesTypes.acOrganizerActionStop:
      return {
        ...state,
        loadingOrganizerAction: false
      }

    case acRolesTypes.acOrganizerActionList:
      return {
        ...state,
        organizerActions: [ ...action.payload ]
      }

    case acRolesTypes.acOrganizerActionRemove:
      return {
        ...state,
        organizerActions: []
      }

    case acRolesTypes.acOrganizerActionNew:
      return {
        ...state,
        organizerActions: [ ...state.organizerActions, ...action.payload ]
      }

    case acRolesTypes.acOrganizerActionBlock:
      return {
        ...state,
        organizerActions: state.organizerActions.filter( 
          data => data.id !== action.payload
        )
      }

    case acRolesTypes.acAssignActivityOrganizerLoad:
      return {
        ...state,
        loadingOrganizerAssignActivity: true
      }

    case acRolesTypes.acAssignActivityOrganizerStop:
      return {
        ...state,
        loadingOrganizerAssignActivity: false
      }

    case acRolesTypes.acAssignActivityOrganizerList:
      return {
        ...state,
        organizerAssignActivities: [ ...action.payload ]
      }

    case acRolesTypes.acAssignActivityOrganizerRemove:
      return {
        ...state,
        organizerAssignActivities: []
      }

    case acRolesTypes.acAssignActivityOrganizerNew:
      return {
        ...state,
        organizerAssignActivities: [ 
          ...state.organizerAssignActivities, ...action.payload 
        ]
      }

    case acRolesTypes.acAssignActivityOrganizerBlock:
      return {
        ...state,
        organizerAssignActivities: state.organizerAssignActivities.filter( 
          data => data.id !== action.payload
        )
      }

    case acRolesTypes.acDescribeUnderstandingOrganizerLoad:
      return {
        ...state,
        loadingOrganizerDescribeUnderstanding: true
      }

    case acRolesTypes.acDescribeUnderstandingOrganizerStop:
      return {
        ...state,
        loadingOrganizerDescribeUnderstanding: false
      }

    case acRolesTypes.acDescribeUnderstandingOrganizerList:
      return {
        ...state,
        organizerDescribeUnderstandingList: [ ...action.payload ]
      }

    case acRolesTypes.acDescribeUnderstandingOrganizerRemove:
      return {
        ...state,
        organizerDescribeUnderstandingList: []
      }

    case acRolesTypes.acDescribeUnderstandingOrganizerNew:
      return {
        ...state,
        organizerDescribeUnderstandingList: [ 
          ...state.organizerDescribeUnderstandingList, action.payload 
        ]
      }

    case acRolesTypes.acDescribeUnderstandingOrganizerBlock:
      return {
        ...state,
        organizerDescribeUnderstandingList: state.organizerDescribeUnderstandingList.filter( 
          data => data.id !== action.payload
        )
      }

    default:
      return state;
  }
}