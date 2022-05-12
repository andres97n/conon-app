import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { getError } from "../../../../helpers/admin";
import { 
  getMemberPerformanceCoordinatorAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadMemberPerformanceCoodirnatorAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingMemberPerformanceCoordinatorAc() );
      const respMemberPerformanceAc = await fetchWithToken( 
        `ac-roles/api/member-performance-coordinator-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyMemberPerformanceAc = await respMemberPerformanceAc.json();

      if (bodyMemberPerformanceAc.ok) {
        dispatch( setMemberPerformanceCoordinatorAcList( bodyMemberPerformanceAc.conon_data));
        dispatch( endLoadingMemberPerformanceCoordinatorAc() );
      } else {
        Swal.fire('Error', bodyMemberPerformanceAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadMemberPerformanceCoordinatorAcByMember = ( teamDetailId, memberId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingMemberPerformanceCoordinatorAc() );
      const respMemberPerformanceAc = await fetchWithToken( 
        `ac-roles/api/member-performance-coordinator-ac?team_detail_ac=${teamDetailId}&member_ac=${memberId}` 
      );
      const bodyMemberPerformanceAc = await respMemberPerformanceAc.json();

      if (bodyMemberPerformanceAc.ok) {
        dispatch( setMemberPerformanceCoordinatorAcList( 
          bodyMemberPerformanceAc.conon_data
        ));
        dispatch( endLoadingMemberPerformanceCoordinatorAc() );
      } else {
        Swal.fire('Error', bodyMemberPerformanceAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveMemberPerformanceCoordinatorAc = ( memberPerformance, toast ) => {
  return async ( dispatch ) => {
    try {
      const respMemberPerformanceAc = await fetchWithToken( 
        'ac-roles/api/member-performance-coordinator-ac/', memberPerformance, 'POST'  
      );
      const bodyMemberPerformanceAc = await respMemberPerformanceAc.json();

      if ( bodyMemberPerformanceAc.ok ) {
        dispatch( addNewMemberPerformanceCoordinatorAc(
          { ...memberPerformance, id: bodyMemberPerformanceAc.member_performance_ac }
        ));
        getToastMsg(toast, 'success', bodyMemberPerformanceAc.message );
      } else if ( bodyMemberPerformanceAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyMemberPerformanceAc.detail, 
            getMemberPerformanceCoordinatorAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyMemberPerformanceAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockMemberPerformanceCoordinatorAc = ( memberPerformanceId, toast ) => {
  return async (dispatch) => {
    try {
      const respMemberPerformanceAc = await fetchWithToken(
        `ac-roles/api/member-performance-coordinator-ac/${memberPerformanceId}/block`, 
        {}, 
        'DELETE' 
      );
      const bodyMemberPerformanceAc = await respMemberPerformanceAc.json();

      if ( bodyMemberPerformanceAc.ok ) {
        dispatch( blockMemberPerformanceCoordinatorAc( memberPerformanceId ) );
        getToastMsg(toast, 'success', bodyMemberPerformanceAc.message );
      } else if (bodyMemberPerformanceAc.detail) {
        Swal.fire(
          'Error', bodyMemberPerformanceAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setMemberPerformanceCoordinatorAcList = ( performancesList ) => ({
  type: acRolesTypes.acMemberPerformanceCoordinatorList,
  payload: performancesList
});
    
export const startRemoveMemberPerformanceCoordinatorAcList = () => ({
  type: acRolesTypes.acMemberPerformanceCoordinatorRemove
});

const startLoadingMemberPerformanceCoordinatorAc = () => ({
  type: acRolesTypes.acMemberPerformanceCoordinatorLoad
});

const endLoadingMemberPerformanceCoordinatorAc = () => ({
  type: acRolesTypes.acMemberPerformanceCoordinatorStop
});

const addNewMemberPerformanceCoordinatorAc = ( performanceAc ) => ({
  type: acRolesTypes.acMemberPerformanceCoordinatorNew,
  payload: performanceAc
});

const blockMemberPerformanceCoordinatorAc = ( performanceAcId ) => ({
  type: acRolesTypes.acMemberPerformanceCoordinatorBlock,
  payload: performanceAcId
});