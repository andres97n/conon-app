import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getAcObjectWithId,
  getCoordinatorStrategyAcErrorMessage, 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadCoordinatorStrategiesAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingCoordinatorStrategyAc() );
      const respCoordinatorStrategyAc = await fetchWithToken( 
        `ac-roles/api/coordinator-strategy-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyCoordinatorStrategyAc = await respCoordinatorStrategyAc.json();

      if (bodyCoordinatorStrategyAc.ok) {
        dispatch( setCoordinatorStrategyAcList( bodyCoordinatorStrategyAc.conon_data));
        dispatch( endLoadingCoordinatorStrategyAc() );
      } else {
        Swal.fire('Error', bodyCoordinatorStrategyAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveCoordinatorStrategyAc = ( coordinatorStrategy, toast ) => {
  return async ( dispatch ) => {
    try {
      const respCoordinatorStrategyAc = await fetchWithToken( 
        'ac-roles/api/coordinator-strategy-ac/', coordinatorStrategy, 'POST'  
      );
      const bodyCoordinatorStrategyAc = await respCoordinatorStrategyAc.json();

      if ( bodyCoordinatorStrategyAc.ok ) {
        dispatch( addNewCoordinatorStrategyAc( getAcObjectWithId( 
          bodyCoordinatorStrategyAc.coordinator_strategy_ac, 
          coordinatorStrategy 
        )));
        getToastMsg(toast, 'success', bodyCoordinatorStrategyAc.message );
      } else if ( bodyCoordinatorStrategyAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyCoordinatorStrategyAc.detail, getCoordinatorStrategyAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyCoordinatorStrategyAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockCoordinatorStrategyAc = ( coordinatorStrategyId, toast ) => {
  return async (dispatch) => {
    try {
      const respCoordinatorStrategyAc = await fetchWithToken(
        `ac-roles/api/coordinator-strategy-ac/${coordinatorStrategyId}/block`, {}, 'DELETE' 
      );
      const bodyCoordinatorStrategyAc = await respCoordinatorStrategyAc.json();

      if ( bodyCoordinatorStrategyAc.ok ) {
        dispatch( blockCoordinatorStrategyAc( coordinatorStrategyId ) );
        getToastMsg(toast, 'success', bodyCoordinatorStrategyAc.message );
      } else if (bodyCoordinatorStrategyAc.detail) {
        Swal.fire(
          'Error', bodyCoordinatorStrategyAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setCoordinatorStrategyAcList = ( strategiesList ) => ({
  type: acRolesTypes.acCoordinatorStrategyList,
  payload: strategiesList
});
  
export const startRemoveCoordinatorStrategyAcList = () => ({
  type: acRolesTypes.acCoordinatorStrategyRemove
});

const startLoadingCoordinatorStrategyAc = () => ({
  type: acRolesTypes.acCoordinatorStrategyLoad
});

const endLoadingCoordinatorStrategyAc = () => ({
  type: acRolesTypes.acCoordinatorStrategyStop
});

const addNewCoordinatorStrategyAc = ( strategyAc ) => ({
  type: acRolesTypes.acCoordinatorStrategyNew,
  payload: strategyAc
});

const blockCoordinatorStrategyAc = ( strategyAcId ) => ({
  type: acRolesTypes.acCoordinatorStrategyBlock,
  payload: strategyAcId
});