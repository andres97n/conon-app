import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getDescribeUnderstadingOrganizerAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadDescribeUnderstadingOrganizerAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingDescribeUnderstadingOrganizerAc() );
      const respDescribeUnderstandingAc = await fetchWithToken( 
          `ac-roles/api/describe-understanding-organizer-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyDescribeUnderstandingAc = await respDescribeUnderstandingAc.json();

      if (bodyDescribeUnderstandingAc.ok) {
          dispatch( setDescribeUnderstadingOrganizerAcList( 
              bodyDescribeUnderstandingAc.conon_data
          ));
          dispatch( endLoadingDescribeUnderstadingOrganizerAc() );
      } else {
          Swal.fire('Error', bodyDescribeUnderstandingAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
          'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadDescribeUnderstadingOrganizerAcByMember = ( teamDetailId, memberId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingDescribeUnderstadingOrganizerAc() );
      const respDescribeUnderstandingAc = await fetchWithToken( 
          `ac-roles/api/describe-understanding-organizer-ac?team_detail_ac=${teamDetailId}&member_ac=${memberId}` 
      );
      const bodyDescribeUnderstandingAc = await respDescribeUnderstandingAc.json();

      if (bodyDescribeUnderstandingAc.ok) {
          dispatch( setDescribeUnderstadingOrganizerAcList( 
              bodyDescribeUnderstandingAc.conon_data
          ));
          dispatch( endLoadingDescribeUnderstadingOrganizerAc() );
      } else {
          Swal.fire('Error', bodyDescribeUnderstandingAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
          'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveDescribeUnderstadingOrganizerAc = ( describeUnderstading, toast ) => {
  return async ( dispatch ) => {
    try {
      const respDescribeUnderstandingAc = await fetchWithToken( 
        'ac-roles/api/describe-understanding-organizer-ac/', describeUnderstading, 'POST'  
      );
      const bodyDescribeUnderstandingAc = await respDescribeUnderstandingAc.json();

      if ( bodyDescribeUnderstandingAc.ok ) {
        dispatch( setDescribeUnderstadingOrganizerAcList([{ 
          ...describeUnderstading, 
          id: bodyDescribeUnderstandingAc.describe_understanding_ac 
        }]));
        getToastMsg(toast, 'success', bodyDescribeUnderstandingAc.message );
      } else if ( bodyDescribeUnderstandingAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyDescribeUnderstandingAc.detail, 
            getDescribeUnderstadingOrganizerAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyDescribeUnderstandingAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockDescribeUnderstadingOrganizerAc = ( describeId, toast ) => {
  return async (dispatch) => {
    try {
      const respDescribeUnderstandingAc = await fetchWithToken(
        `ac-roles/api/describe-understanding-organizer-ac/${describeId}/block`, {}, 'DELETE' 
      );
      const bodyDescribeUnderstandingAc = await respDescribeUnderstandingAc.json();

      if ( bodyDescribeUnderstandingAc.ok ) {
        dispatch( blockDescribeUnderstadingOrganizerAc( describeId ) );
        getToastMsg(toast, 'success', bodyDescribeUnderstandingAc.message );
      } else if (bodyDescribeUnderstandingAc.detail) {
        Swal.fire(
          'Error', bodyDescribeUnderstandingAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setDescribeUnderstadingOrganizerAcList = ( describeUderstandingList ) => ({
  type: acRolesTypes.acDescribeUnderstandingOrganizerList,
  payload: describeUderstandingList
});
    
export const startRemoveDescribeUnderstadingOrganizerAcList = () => ({
  type: acRolesTypes.acDescribeUnderstandingOrganizerRemove
});

const startLoadingDescribeUnderstadingOrganizerAc = () => ({
  type: acRolesTypes.acDescribeUnderstandingOrganizerLoad
});

const endLoadingDescribeUnderstadingOrganizerAc = () => ({
  type: acRolesTypes.acDescribeUnderstandingOrganizerStop
});

const blockDescribeUnderstadingOrganizerAc = ( describeUnderstadingId ) => ({
  type: acRolesTypes.acDescribeUnderstandingOrganizerBlock,
  payload: describeUnderstadingId
});