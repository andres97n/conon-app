import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getTeacherAnswerDescriptionSecretaryAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadTeacherAnswerDescriptionsAcList = ( teamId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingTeacherAnswerDescriptionSecretaryAc() );
      const respTeacherAnswerDescriptionAc = await fetchWithToken( 
        `ac-roles/api/teacher-answer-description-secretary-ac?team_detail_ac=${teamId}` 
      );
      const bodyTeacherAnswerDescriptionAc = await respTeacherAnswerDescriptionAc.json();

      if (bodyTeacherAnswerDescriptionAc.ok) {
        dispatch( setTeacherAnswerDescriptionSecretaryAcList( 
          bodyTeacherAnswerDescriptionAc.conon_data
        ));
        dispatch( endLoadingTeacherAnswerDescriptionSecretaryAc() );
      } else {
        Swal.fire('Error', bodyTeacherAnswerDescriptionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveTeacherAnswerDescriptionSecretaryAc = ( 
  secretaryDescription, toast 
) => {
  return async ( dispatch ) => {
    try {
      const respTeacherAnswerDescriptionAc = await fetchWithToken( 
        'ac-roles/api/teacher-answer-description-secretary-ac/', secretaryDescription, 'POST'  
      );
      const bodyTeacherAnswerDescriptionAc = await respTeacherAnswerDescriptionAc.json();

      if ( bodyTeacherAnswerDescriptionAc.ok ) {
        dispatch( addNewTeacherAnswerDescriptionSecretaryAc({ 
          ...secretaryDescription, 
          id: bodyTeacherAnswerDescriptionAc.teacher_answer_description_ac 
        }));
        getToastMsg(toast, 'success', bodyTeacherAnswerDescriptionAc.message );
      } else if ( bodyTeacherAnswerDescriptionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyTeacherAnswerDescriptionAc.detail, 
            getTeacherAnswerDescriptionSecretaryAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyTeacherAnswerDescriptionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

const setTeacherAnswerDescriptionSecretaryAcList = ( secretaryDescriptionsList ) => ({
  type: acRolesTypes.acTeacherAnswerDescriptionSecretaryList,
  payload: secretaryDescriptionsList
});
    
export const startRemoveTeacherAnswerDescriptionSecretaryAcList = () => ({
  type: acRolesTypes.acTeacherAnswerDescriptionSecretaryRemove
});

const startLoadingTeacherAnswerDescriptionSecretaryAc = () => ({
  type: acRolesTypes.acTeacherAnswerDescriptionSecretaryLoad
});

const endLoadingTeacherAnswerDescriptionSecretaryAc = () => ({
  type: acRolesTypes.acTeacherAnswerDescriptionSecretaryStop
});

const addNewTeacherAnswerDescriptionSecretaryAc = ( secretaryDescriptionAc ) => ({
  type: acRolesTypes.acTeacherAnswerDescriptionSecretaryNew,
  payload: secretaryDescriptionAc
});