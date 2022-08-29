import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getAcObjectWithId, 
  getSecretaryInformationAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadSecretaryInformationsAcList = ( teamId ) => {
  return async (dispatch) => {
    try {
      console.log(teamId);
      dispatch( startLoadingSecretaryInformationAc() );
      const respSecretaryInformationAc = await fetchWithToken( 
        `ac-roles/api/secretary-information-ac?team_ac=${teamId}`
      );
      console.log('hola');
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();
      console.log(bodySecretaryInformationAc);
      
      if (bodySecretaryInformationAc.ok) {
        dispatch( setSecretaryInformationAcList( bodySecretaryInformationAc.conon_data));
        dispatch( endLoadingSecretaryInformationAc() );
      } else {
        console.log(bodySecretaryInformationAc.detail);
        Swal.fire('Error', bodySecretaryInformationAc.detail, 'error');
      }

    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadSecretaryInformationsByTeamDetail = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingSecretaryInformationAc() );
      const respSecretaryInformationAc = await fetchWithToken( 
        `ac-roles/api/secretary-information-ac/${teamDetailId}/by-team-detail` 
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if (bodySecretaryInformationAc.ok) {
        dispatch( setSecretaryInformationAcList( bodySecretaryInformationAc.conon_data));
        dispatch( endLoadingSecretaryInformationAc() );
      } else {
        Swal.fire('Error', bodySecretaryInformationAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveSecretaryInformationAc = ( informationAc, toast ) => {
  return async ( dispatch ) => {
    try {
      const respSecretaryInformationAc = await fetchWithToken( 
        'ac-roles/api/secretary-information-ac/', informationAc, 'POST'  
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if ( bodySecretaryInformationAc.ok ) {
        dispatch( addNewSecretaryInformationAc( getAcObjectWithId( 
          bodySecretaryInformationAc.secretary_information_ac, 
          informationAc 
        )));
        getToastMsg(toast, 'success', bodySecretaryInformationAc.message );
      } else if ( bodySecretaryInformationAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodySecretaryInformationAc.detail, 
            getSecretaryInformationAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodySecretaryInformationAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockSecretaryInformationAc = ( secretaryInformationId, toast ) => {
  return async (dispatch) => {
    try {
      const respSecretaryInformationAc = await fetchWithToken(
        `ac-roles/api/secretary-information-ac/${secretaryInformationId}/block`, {}, 'DELETE' 
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if ( bodySecretaryInformationAc.ok ) {
        dispatch( blockSecretaryInformationAc( secretaryInformationId ) );
        getToastMsg(toast, 'success', bodySecretaryInformationAc.message );
      } else if (bodySecretaryInformationAc.detail) {
        Swal.fire(
          'Error', bodySecretaryInformationAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setSecretaryInformationAcList = ( informationList ) => ({
    type: acRolesTypes.acSecretaryInformationList,
    payload: informationList
  });
      
  export const startRemoveSecretaryInformationAcList = () => ({
    type: acRolesTypes.acSecretaryInformationRemove
  });
  
  const startLoadingSecretaryInformationAc = () => ({
    type: acRolesTypes.acSecretaryInformationLoad
  });
  
  const endLoadingSecretaryInformationAc = () => ({
    type: acRolesTypes.acSecretaryInformationStop
  });
  
  const addNewSecretaryInformationAc = ( informationAc ) => ({
    type: acRolesTypes.acSecretaryInformationNew,
    payload: informationAc
  });
  
  const blockSecretaryInformationAc = ( informationAcId ) => ({
    type: acRolesTypes.acSecretaryInformationBlock,
    payload: informationAcId
  });