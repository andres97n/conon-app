import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getAcObjectWithId, 
  getFeaturedInformationSecretaryAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadFeaturedInformationsSecretaryAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingFeaturedInformationSecretaryAc() );
      const respSecretaryInformationAc = await fetchWithToken( 
        `ac-roles/api/featured-information-secretary-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if (bodySecretaryInformationAc.ok) {
        dispatch( setFeaturedInformationSecretaryAcList( 
          bodySecretaryInformationAc.conon_data
        ));
        dispatch( endLoadingFeaturedInformationSecretaryAc() );
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

export const startLoadCurrentFeaturedInformationsSecretaryAcByMember = ( 
  teamDetailId, 
  memberId 
) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingFeaturedInformationSecretaryAc() );
      const respSecretaryInformationAc = await fetchWithToken( 
        `ac-roles/api/path/featured-information-secretary/current-team-information/${teamDetailId}/${memberId}/` 
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if (bodySecretaryInformationAc.ok) {
        dispatch( setFeaturedInformationSecretaryAcList( 
          bodySecretaryInformationAc.conon_data
        ));
        dispatch( endLoadingFeaturedInformationSecretaryAc() );
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

export const startSaveFeaturedInformationSecretaryAc = ( informationAc, toast ) => {
  return async ( dispatch ) => {
    try {
      const respSecretaryInformationAc = await fetchWithToken( 
        'ac-roles/api/featured-information-secretary-ac/', informationAc, 'POST'  
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if ( bodySecretaryInformationAc.ok ) {
        dispatch( addNewFeaturedInformationSecretaryAc( getAcObjectWithId( 
          bodySecretaryInformationAc.featured_information_ac, 
          informationAc 
        )));
        getToastMsg(toast, 'success', bodySecretaryInformationAc.message );
      } else if ( bodySecretaryInformationAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodySecretaryInformationAc.detail, 
            getFeaturedInformationSecretaryAcErrorMessage 
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

export const startBlockFeaturedInformationSecretaryAc = ( secretaryInformationId, toast ) => {
  return async (dispatch) => {
    try {
      const respSecretaryInformationAc = await fetchWithToken(
        `ac-roles/api/featured-information-secretary-ac/${secretaryInformationId}/block`, {}, 'DELETE' 
      );
      const bodySecretaryInformationAc = await respSecretaryInformationAc.json();

      if ( bodySecretaryInformationAc.ok ) {
        dispatch( blockFeaturedInformationSecretaryAc( secretaryInformationId ) );
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

const setFeaturedInformationSecretaryAcList = ( informationList ) => ({
  type: acRolesTypes.acFeaturedInformationSecretaryList,
  payload: informationList
});
    
export const startRemoveFeaturedInformationSecretaryAcList = () => ({
  type: acRolesTypes.acFeaturedInformationSecretaryRemove
});

const startLoadingFeaturedInformationSecretaryAc = () => ({
  type: acRolesTypes.acFeaturedInformationSecretaryLoad
});

const endLoadingFeaturedInformationSecretaryAc = () => ({
  type: acRolesTypes.acFeaturedInformationSecretaryStop
});

const addNewFeaturedInformationSecretaryAc = ( informationAc ) => ({
  type: acRolesTypes.acFeaturedInformationSecretaryNew,
  payload: informationAc
});

const blockFeaturedInformationSecretaryAc = ( informationAcId ) => ({
  type: acRolesTypes.acFeaturedInformationSecretaryBlock,
  payload: informationAcId
});