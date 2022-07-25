import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getProblemResolutionGroupAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadProblemResolutionGroupAc = ( teamId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingProblemResolutionGroupAc() );
      const respProblemResolutionAc = await fetchWithToken( 
        `ac-roles/api/problem-resolution-group-ac?team_ac=${teamId}` 
      );
      const bodyProblemResolutionAc = await respProblemResolutionAc.json();

      if (bodyProblemResolutionAc.ok) {
        dispatch( setProblemResolutionGroupAcList( bodyProblemResolutionAc.conon_data[0]));
        dispatch( endLoadingProblemResolutionGroupAc() );
      } else {
        Swal.fire('Error', bodyProblemResolutionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadProblemResolutionGroupByTeamDetailAc = ( teamDetailAc ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingProblemResolutionGroupAc() );
      const respProblemResolutionAc = await fetchWithToken( 
        `ac-roles/api/problem-resolution-group-ac/${teamDetailAc}/by-team-detail` 
      );
      const bodyProblemResolutionAc = await respProblemResolutionAc.json();

      if (bodyProblemResolutionAc.ok) {
        dispatch( setProblemResolutionGroupAcList( bodyProblemResolutionAc.conon_data));
        dispatch( endLoadingProblemResolutionGroupAc() );
      } else {
        Swal.fire('Error', bodyProblemResolutionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}


export const startSaveProblemResolutionGroupAc = ( problemResolution, toast ) => {
  return async ( dispatch ) => {
    try {
      const respProblemResolutionAc = await fetchWithToken( 
        'ac-roles/api/problem-resolution-group-ac/', problemResolution, 'POST'  
      );
      const bodyProblemResolutionAc = await respProblemResolutionAc.json();

      if ( bodyProblemResolutionAc.ok ) {
        dispatch( addNewProblemResolutionGroupAc(
          { ...problemResolution, id: bodyProblemResolutionAc.problem_resolution_group_ac }
        ));
        getToastMsg(toast, 'success', bodyProblemResolutionAc.message );
      } else if ( bodyProblemResolutionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyProblemResolutionAc.detail, 
            getProblemResolutionGroupAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyProblemResolutionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startUpdateProblemResolutionGroupAc = ( solutionId, problemResolution, toast ) => {
  return async ( dispatch ) => {
    try {
      const respProblemResolutionAc = await fetchWithToken( 
        `ac-roles/api/problem-resolution-group-ac/${solutionId}/`, problemResolution, 'PUT'  
      );
      const bodyProblemResolutionAc = await respProblemResolutionAc.json();

      if ( bodyProblemResolutionAc.ok ) {
        dispatch( setProblemResolutionGroupAcList({ ...problemResolution, id: solutionId }));
        getToastMsg(toast, 'success', 'Resolución Actualizada Correctamente' );
      } else if ( bodyProblemResolutionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyProblemResolutionAc.detail, 
            getProblemResolutionGroupAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyProblemResolutionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

const setProblemResolutionGroupAcList = ( problemResolution ) => ({
  type: acRolesTypes.acProblemResolutionGroupList,
  payload: problemResolution
});
    
export const startRemoveProblemResolutionGroupAcList = () => ({
  type: acRolesTypes.acProblemResolutionGroupRemove
});

const startLoadingProblemResolutionGroupAc = () => ({
  type: acRolesTypes.acProblemResolutionGroupLoad
});

const endLoadingProblemResolutionGroupAc = () => ({
  type: acRolesTypes.acProblemResolutionGroupStop
});

const addNewProblemResolutionGroupAc = ( problemResolution ) => ({
  type: acRolesTypes.acProblemResolutionGroupNew,
  payload: problemResolution
});