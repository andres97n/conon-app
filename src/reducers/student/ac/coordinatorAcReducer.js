import { acRolesTypes } from "../../../types/acRolesTypes";

const initialState = {
  coordinatorStrategies: [],
  memberPerformancesCoordinator: [],
  problemResolutionGroup: {},
  loadingCoordinatorStrategy: false,
  loadingMemberPerformancesCoordinator: false,
  loadingProblemResolutionGroup: false,
}

export const coordinatorAcReducer = ( state = initialState, action ) => {
  switch (action.type) {

    case acRolesTypes.acCoordinatorStrategyLoad:
      return {
        ...state,
        loadingCoordinatorStrategy: true
      }

    case acRolesTypes.acCoordinatorStrategyStop:
      return {
        ...state,
        loadingCoordinatorStrategy: false
      }

    case acRolesTypes.acCoordinatorStrategyList:
      return {
        ...state,
        coordinatorStrategies: [ ...action.payload ]
      }

    case acRolesTypes.acCoordinatorStrategyRemove:
      return {
        ...state,
        coordinatorStrategies: []
      }

    case acRolesTypes.acCoordinatorStrategyNew:
      return {
        ...state,
        coordinatorStrategies: [ ...state.coordinatorStrategies, ...action.payload ]
      }

    case acRolesTypes.acCoordinatorStrategyBlock:
      return {
        ...state,
        coordinatorStrategies: state.coordinatorStrategies.filter( 
          data => data.id !== action.payload
        )
      }

    case acRolesTypes.acMemberPerformanceCoordinatorLoad:
      return {
        ...state,
        loadingMemberPerformancesCoordinator: true
      }

    case acRolesTypes.acMemberPerformanceCoordinatorStop:
      return {
        ...state,
        loadingMemberPerformancesCoordinator: false
      }

    case acRolesTypes.acMemberPerformanceCoordinatorList:
      return {
        ...state,
        memberPerformancesCoordinator: [ ...action.payload ]
      }

    case acRolesTypes.acMemberPerformanceCoordinatorRemove:
      return {
        ...state,
        memberPerformancesCoordinator: []
      }

    case acRolesTypes.acMemberPerformanceCoordinatorNew:
      return {
        ...state,
        memberPerformancesCoordinator: [ 
          ...state.memberPerformancesCoordinator, action.payload 
        ]
      }

    case acRolesTypes.acMemberPerformanceCoordinatorBlock:
      return {
        ...state,
        memberPerformancesCoordinator: state.memberPerformancesCoordinator.filter( 
          data => data.id !== action.payload
        )
      }
      
    case acRolesTypes.acProblemResolutionGroupLoad:
      return {
        ...state,
        loadingProblemResolutionGroup: true
      }

    case acRolesTypes.acProblemResolutionGroupStop:
      return {
        ...state,
        loadingProblemResolutionGroup: false
      }

    case acRolesTypes.acProblemResolutionGroupList:
      return {
        ...state,
        problemResolutionGroup: { ...action.payload } 
      }

    case acRolesTypes.acProblemResolutionGroupRemove:
      return {
        ...state,
        problemResolutionGroup: {}
      }

    case acRolesTypes.acProblemResolutionGroupNew:
      return {
        ...state,
        problemResolutionGroup: { ...action.payload } 
      }

    default:
      return state;
  }
}