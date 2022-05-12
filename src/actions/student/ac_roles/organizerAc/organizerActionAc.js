import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getAcObjectWithId,
  getOrganizerActionAcErrorMessage, 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadOrganizerActionsAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingOrganizerActionAc() );
      const respOrganizerActionAc = await fetchWithToken( 
        `ac-roles/api/organizer-action-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyOrganizerActionAc = await respOrganizerActionAc.json();

      if (bodyOrganizerActionAc.ok) {
        dispatch( setOrganizerActionAcList( bodyOrganizerActionAc.conon_data));
        dispatch( endLoadingOrganizerActionAc() );
      } else {
        Swal.fire('Error', bodyOrganizerActionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveOrganizerActionAc = ( organizerAction, toast ) => {
  return async ( dispatch ) => {
    try {
      const respOrganizerActionAc = await fetchWithToken( 
        'ac-roles/api/organizer-action-ac/', organizerAction, 'POST'  
      );
      const bodyOrganizerActionAc = await respOrganizerActionAc.json();

      if ( bodyOrganizerActionAc.ok ) {
        dispatch( addNewOrganizerActionAc( getAcObjectWithId( 
          bodyOrganizerActionAc.organizer_action_ac, 
          organizerAction 
        )));
        getToastMsg(toast, 'success', bodyOrganizerActionAc.message );
      } else if ( bodyOrganizerActionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyOrganizerActionAc.detail, getOrganizerActionAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyOrganizerActionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockOrganizerActionAc = ( organizerActionId, toast ) => {
  return async (dispatch) => {
    try {
      const respOrganizerActionAc = await fetchWithToken(
        `ac-roles/api/organizer-action-ac/${organizerActionId}/block/`, {}, 'DELETE' 
      );
      const bodyOrganizerActionAc = await respOrganizerActionAc.json();

      if ( bodyOrganizerActionAc.ok ) {
        dispatch( blockOrganizerActionAc( organizerActionId ) );
        getToastMsg(toast, 'success', bodyOrganizerActionAc.message );
      } else if (bodyOrganizerActionAc.detail) {
        Swal.fire(
          'Error', bodyOrganizerActionAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setOrganizerActionAcList = ( actionsList ) => ({
  type: acRolesTypes.acOrganizerActionList,
  payload: actionsList
});
    
export const startRemoveOrganizerActionAcList = () => ({
  type: acRolesTypes.acOrganizerActionRemove
});

const startLoadingOrganizerActionAc = () => ({
  type: acRolesTypes.acOrganizerActionLoad
});

const endLoadingOrganizerActionAc = () => ({
  type: acRolesTypes.acOrganizerActionStop
});

const addNewOrganizerActionAc = ( actionAc ) => ({
  type: acRolesTypes.acOrganizerActionNew,
  payload: actionAc
});

const blockOrganizerActionAc = ( organizerAcId ) => ({
  type: acRolesTypes.acOrganizerActionBlock,
  payload: organizerAcId
});