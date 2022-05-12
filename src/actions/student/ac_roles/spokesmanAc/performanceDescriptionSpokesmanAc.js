import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getPerformanceDescriptionSpokesmanAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadPerformanceDescriptionSpokesmanAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingPerformanceDescriptionSpokesmanAc() );
      const respPerformanceDescriptionAc = await fetchWithToken( 
        `ac-roles/api/performance-description-spokesman-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodyPerformanceDescriptionAc = await respPerformanceDescriptionAc.json();

      if (bodyPerformanceDescriptionAc.ok) {
        dispatch( setPerformanceDescriptionSpokesmanAcList( 
          bodyPerformanceDescriptionAc.conon_data[0]
        ));
        dispatch( endLoadingPerformanceDescriptionSpokesmanAc() );
      } else {
        Swal.fire('Error', bodyPerformanceDescriptionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSavePerformanceDescriptionSpokesmanAc = ( performanceAc, toast ) => {
  return async ( dispatch ) => {
    try {
      const respPerformanceDescriptionAc = await fetchWithToken( 
        'ac-roles/api/performance-description-spokesman-ac/', performanceAc, 'POST'  
      );
      const bodyPerformanceDescriptionAc = await respPerformanceDescriptionAc.json();

      if ( bodyPerformanceDescriptionAc.ok ) {
        dispatch( addNewPerformanceDescriptionSpokesmanAc({
          ...performanceAc,
          id: bodyPerformanceDescriptionAc.performance_description_ac
        }));
        getToastMsg(toast, 'success', bodyPerformanceDescriptionAc.message );
      } else if ( bodyPerformanceDescriptionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyPerformanceDescriptionAc.detail, 
            getPerformanceDescriptionSpokesmanAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyPerformanceDescriptionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startUpdatePerformanceDescriptionSpokesmanAc = ( 
  descriptionId, 
  descriptionAc, 
  toast 
) => {
  return async ( dispatch ) => {
    try {
      const respPerformanceDescriptionAc = await fetchWithToken( 
        `ac-roles/api/performance-description-spokesman-ac/${descriptionId}/`, 
        descriptionAc, 
        'PUT'  
      );
      const bodyPerformanceDescriptionAc = await respPerformanceDescriptionAc.json();

      if ( bodyPerformanceDescriptionAc.ok ) {
        dispatch( setPerformanceDescriptionSpokesmanAcList({
          ...descriptionAc,
          id: bodyPerformanceDescriptionAc.performance_description_ac
        }));
        getToastMsg(toast, 'success', 'Resolución Actualizada Correctamente' );
      } else if ( bodyPerformanceDescriptionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyPerformanceDescriptionAc.detail, 
            getPerformanceDescriptionSpokesmanAcErrorMessage
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyPerformanceDescriptionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

const setPerformanceDescriptionSpokesmanAcList = ( performanceDescription ) => ({
  type: acRolesTypes.acPerformanceDescriptionSpokesmanList,
  payload: performanceDescription
});
    
export const startRemovePerformanceDescriptionSpokesmanAcList = () => ({
  type: acRolesTypes.acPerformanceDescriptionSpokesmanRemove
});

const startLoadingPerformanceDescriptionSpokesmanAc = () => ({
  type: acRolesTypes.acPerformanceDescriptionSpokesmanLoad
});

const endLoadingPerformanceDescriptionSpokesmanAc = () => ({
  type: acRolesTypes.acPerformanceDescriptionSpokesmanStop
});

const addNewPerformanceDescriptionSpokesmanAc = ( performanceDescription ) => ({
  type: acRolesTypes.acPerformanceDescriptionSpokesmanNew,
  payload: performanceDescription
});
