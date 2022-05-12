import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getAcObjectWithId,
  getAssignActivityOrganizerAcErrorMessage, 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadAssignActivityOrganizerAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingAssignActivityOrganizerAc() );
      const respAssignActivityAc = await fetchWithToken( 
        `ac-roles/api/assign-activity-organizer-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyAssignActivityAc = await respAssignActivityAc.json();

      if (bodyAssignActivityAc.ok) {
        dispatch( setAssignActivityOrganizerAcList( bodyAssignActivityAc.conon_data));
        dispatch( endLoadingAssignActivityOrganizerAc() );
      } else {
        Swal.fire('Error', bodyAssignActivityAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadAssignActivityOrganizerAcByMember = ( teamDetailId, memberId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingAssignActivityOrganizerAc() );
      const respAssignActivityAc = await fetchWithToken( 
        `ac-roles/api/assign-activity-organizer-ac?team_detail_ac=${teamDetailId}&member_ac=${memberId}` 
      );
      const bodyAssignActivityAc = await respAssignActivityAc.json();

      if (bodyAssignActivityAc.ok) {
        dispatch( setAssignActivityOrganizerAcList( bodyAssignActivityAc.conon_data));
        dispatch( endLoadingAssignActivityOrganizerAc() );
      } else {
        Swal.fire('Error', bodyAssignActivityAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
} 

export const startSaveAssignActivityOrganizerAc = ( assignActivity, toast ) => {
  return async ( dispatch ) => {
    try {
      const respAssignActivityAc = await fetchWithToken( 
        'ac-roles/api/assign-activity-organizer-ac/', assignActivity, 'POST'  
      );
      const bodyAssignActivityAc = await respAssignActivityAc.json();

      if ( bodyAssignActivityAc.ok ) {
        dispatch( addNewAssignActivityOrganizerAc( getAcObjectWithId( 
          bodyAssignActivityAc.assign_activity_ac, 
          assignActivity 
        )));
        getToastMsg(toast, 'success', bodyAssignActivityAc.message );
      } else if ( bodyAssignActivityAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyAssignActivityAc.detail, getAssignActivityOrganizerAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyAssignActivityAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockAssignActivityOrganizerAc = ( assignActivityId, toast ) => {
  return async (dispatch) => {
    try {
      const respAssignActivityAc = await fetchWithToken(
        `ac-roles/api/assign-activity-organizer-ac/${assignActivityId}/block`, {}, 'DELETE' 
      );
      const bodyAssignActivityAc = await respAssignActivityAc.json();

      if ( bodyAssignActivityAc.ok ) {
        dispatch( blockAssignActivityOrganizerAc( assignActivityId ) );
        getToastMsg(toast, 'success', bodyAssignActivityAc.message );
      } else if (bodyAssignActivityAc.detail) {
        Swal.fire(
          'Error', bodyAssignActivityAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setAssignActivityOrganizerAcList = ( assignActivities ) => ({
  type: acRolesTypes.acAssignActivityOrganizerList,
  payload: assignActivities
});
      
export const startRemoveAssignActivityOrganizerAcList = () => ({
  type: acRolesTypes.acAssignActivityOrganizerRemove
});

const startLoadingAssignActivityOrganizerAc = () => ({
  type: acRolesTypes.acAssignActivityOrganizerLoad
});

const endLoadingAssignActivityOrganizerAc = () => ({
  type: acRolesTypes.acAssignActivityOrganizerStop
});

const addNewAssignActivityOrganizerAc = ( assignActivity ) => ({
  type: acRolesTypes.acAssignActivityOrganizerNew,
  payload: assignActivity
});

const blockAssignActivityOrganizerAc = ( assignActivityId ) => ({
  type: acRolesTypes.acAssignActivityOrganizerBlock,
  payload: assignActivityId
});