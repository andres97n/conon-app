import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getActivityDescriptionSpokesmanAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadActivityDescriptionSpokesmanAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingActivityDescriptionSpokesmanAc() );
      const respActivityDescriptionAc = await fetchWithToken( 
          `ac-roles/api/activity-description-spokesman-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyActivityDescriptionAc = await respActivityDescriptionAc.json();

      if (bodyActivityDescriptionAc.ok) {
          dispatch( setActivityDescriptionSpokesmanAcList( 
              bodyActivityDescriptionAc.conon_data
          ));
          dispatch( endLoadingActivityDescriptionSpokesmanAc() );
      } else {
          Swal.fire('Error', bodyActivityDescriptionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
          'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadActivityDescriptionSpokesmanAcByMember = ( teamDetailId, memberId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingActivityDescriptionSpokesmanAc() );
      const respActivityDescriptionAc = await fetchWithToken( 
          `ac-roles/api/activity-description-spokesman-ac?team_detail_ac=${teamDetailId}&member_ac=${memberId}` 
      );
      const bodyActivityDescriptionAc = await respActivityDescriptionAc.json();

      if (bodyActivityDescriptionAc.ok) {
          dispatch( setActivityDescriptionSpokesmanAcList( 
              bodyActivityDescriptionAc.conon_data
          ));
          dispatch( endLoadingActivityDescriptionSpokesmanAc() );
      } else {
          Swal.fire('Error', bodyActivityDescriptionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
          'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveActivityDescriptionSpokesmanAc = ( activityDescription, toast ) => {
  return async ( dispatch ) => {
    try {
      const respActivityDescriptionAc = await fetchWithToken( 
        'ac-roles/api/activity-description-spokesman-ac/', activityDescription, 'POST'  
      );
      const bodyActivityDescriptionAc = await respActivityDescriptionAc.json();

      if ( bodyActivityDescriptionAc.ok ) {
        dispatch( addNewActivityDescriptionSpokesmanAc({
          ...activityDescription,
          id: bodyActivityDescriptionAc.activity_description_ac
        }));
        getToastMsg(toast, 'success', bodyActivityDescriptionAc.message );
      } else if ( bodyActivityDescriptionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyActivityDescriptionAc.detail, 
            getActivityDescriptionSpokesmanAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyActivityDescriptionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startUpdateActivityDescriptionSpokesmanAc = ( 
  activityId, 
  activityDescription, 
  toast 
) => {
  return async ( dispatch ) => {
    try {
      const respActivityDescriptionAc = await fetchWithToken( 
        `ac-roles/api/activity-description-spokesman-ac/${activityId}/`, 
        activityDescription, 
        'PUT'  
      );
      const bodyActivityDescriptionAc = await respActivityDescriptionAc.json();

      if ( bodyActivityDescriptionAc.ok ) {
        dispatch( setActivityDescriptionSpokesmanAcList([{
          ...activityDescription,
          id: bodyActivityDescriptionAc.activity_description_ac
        }]));
        getToastMsg(toast, 'success', 'Actividad Actualizada Correctamente' );
      } else if ( bodyActivityDescriptionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyActivityDescriptionAc.detail, 
            getActivityDescriptionSpokesmanAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyActivityDescriptionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockActivityDescriptionSpokesmanAc = ( descriptionId, toast ) => {
  return async (dispatch) => {
    try {
      const respActivityDescriptionAc = await fetchWithToken(
        `ac-roles/api/activity-description-spokesman-ac/${descriptionId}/block`, {}, 'DELETE' 
      );
      const bodyActivityDescriptionAc = await respActivityDescriptionAc.json();

      if ( bodyActivityDescriptionAc.ok ) {
        dispatch( blockActivityDescriptionSpokesmanAc( descriptionId ) );
        getToastMsg(toast, 'success', bodyActivityDescriptionAc.message );
      } else if (bodyActivityDescriptionAc.detail) {
        Swal.fire(
          'Error', bodyActivityDescriptionAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setActivityDescriptionSpokesmanAcList = ( activityDescriptions ) => ({
  type: acRolesTypes.acActivityDescriptionSpokesmanList,
  payload: activityDescriptions
});
    
export const startRemoveActivityDescriptionSpokesmanAcList = () => ({
  type: acRolesTypes.acActivityDescriptionSpokesmanRemove
});

const startLoadingActivityDescriptionSpokesmanAc = () => ({
  type: acRolesTypes.acActivityDescriptionSpokesmanLoad
});

const endLoadingActivityDescriptionSpokesmanAc = () => ({
  type: acRolesTypes.acActivityDescriptionSpokesmanStop
});

const addNewActivityDescriptionSpokesmanAc = ( activityDescription ) => ({
  type: acRolesTypes.acActivityDescriptionSpokesmanNew,
  payload: activityDescription
});

const blockActivityDescriptionSpokesmanAc = ( activityDescriptionId ) => ({
  type: acRolesTypes.acActivityDescriptionSpokesmanBlock,
  payload: activityDescriptionId
});