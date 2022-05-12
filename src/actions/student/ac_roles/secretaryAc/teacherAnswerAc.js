import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getTeacherAnswerAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadTeacherAnswersAcList = ( teamId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingTeacherAnswerAc() );
      const respTeacherAnswerAc = await fetchWithToken( 
        `ac-roles/api/teacher-answer-ac?team_detail_ac=${teamId}` 
      );
      const bodyTeacherAnswerAc = await respTeacherAnswerAc.json();

      if (bodyTeacherAnswerAc.ok) {
        dispatch( setTeacherAnswerAcList( bodyTeacherAnswerAc.conon_data));
        dispatch( endLoadingTeacherAnswerAc() );
      } else {
        Swal.fire('Error', bodyTeacherAnswerAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveTeacherAnswerAc = ( teacherAnswer, toast ) => {
  return async ( dispatch ) => {
    try {
      const respTeacherAnswerAc = await fetchWithToken( 
        'ac-roles/api/teacher-answer-ac/', teacherAnswer, 'POST'  
      );
      const bodyTeacherAnswerAc = await respTeacherAnswerAc.json();

      if ( bodyTeacherAnswerAc.ok ) {
        dispatch( addNewTeacherAnswerAc(
          { ...teacherAnswer, id: bodyTeacherAnswerAc.teacher_answer_ac }
        ));
        getToastMsg(toast, 'success', bodyTeacherAnswerAc.message );
      } else if ( bodyTeacherAnswerAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyTeacherAnswerAc.detail, 
            getTeacherAnswerAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyTeacherAnswerAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

const setTeacherAnswerAcList = ( teacherAnswersList ) => ({
  type: acRolesTypes.acTeacherAnswerList,
  payload: teacherAnswersList
});
    
export const startRemoveTeacherAnswerAcList = () => ({
  type: acRolesTypes.acTeacherAnswerRemove
});

const startLoadingTeacherAnswerAc = () => ({
  type: acRolesTypes.acTeacherAnswerLoad
});

const endLoadingTeacherAnswerAc = () => ({
  type: acRolesTypes.acTeacherAnswerStop
});

const addNewTeacherAnswerAc = ( teacherAnswerAc ) => ({
  type: acRolesTypes.acAssignActivityOrganizerNew,
  payload: teacherAnswerAc
});