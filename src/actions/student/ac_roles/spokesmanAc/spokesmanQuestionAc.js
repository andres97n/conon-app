import Swal from "sweetalert2";

import { getToastMsg } from "../../../../helpers/abp";
import { getError } from "../../../../helpers/admin";
import { fetchWithToken } from "../../../../helpers/fetch";
import { acRolesTypes } from "../../../../types/acRolesTypes";
import { 
  getAcQuestiontWithId, 
  getSpokesmanQuestionAcErrorMessage 
} from "../../../../helpers/topic/student/ac_roles/rolesErrors";


export const startLoadSpokesmanQuestionAcList = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingSpokesmanQuestionAc() );
      const respSpokesmanQuestionAc = await fetchWithToken( 
          `ac-roles/api/spokesman-question-ac?team_detail_ac=${teamDetailId}` 
      );
      const bodySpokesmanQuestionAc = await respSpokesmanQuestionAc.json();

      if (bodySpokesmanQuestionAc.ok) {
          dispatch( setSpokesmanQuestionAcList( 
              bodySpokesmanQuestionAc.conon_data
          ));
          dispatch( endLoadingSpokesmanQuestionAc() );
      } else {
          Swal.fire('Error', bodySpokesmanQuestionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
          'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadSpokesmanQuestionsWithAnswersAc = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingSpokesmanQuestionAc() );
      const respSpokesmanQuestionAc = await fetchWithToken( 
          `ac-roles/api/path/spokesman-question-ac/questions-and-answers-ac/${teamDetailId}` 
      );
      const bodySpokesmanQuestionAc = await respSpokesmanQuestionAc.json();

      if (bodySpokesmanQuestionAc.ok) {
          dispatch( setSpokesmanQuestionAcList( 
              bodySpokesmanQuestionAc.conon_data
          ));
          dispatch( endLoadingSpokesmanQuestionAc() );
      } else {
          Swal.fire('Error', bodySpokesmanQuestionAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
          'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveSpokesmanQuestionAc = ( spokesmanQuestion, toast ) => {
  return async ( dispatch ) => {
    try {
      const respSpokesmanQuestionAc = await fetchWithToken( 
        'ac-roles/api/spokesman-question-ac/', spokesmanQuestion, 'POST'  
      );
      const bodySpokesmanQuestionAc = await respSpokesmanQuestionAc.json();

      if ( bodySpokesmanQuestionAc.ok ) {
        dispatch( addNewSpokesmanQuestionAc( getAcQuestiontWithId( 
          bodySpokesmanQuestionAc.spokesman_question_ac, 
          spokesmanQuestion 
        )));
        getToastMsg(toast, 'success', bodySpokesmanQuestionAc.message );
      } else if ( bodySpokesmanQuestionAc.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodySpokesmanQuestionAc.detail, 
            getSpokesmanQuestionAcErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodySpokesmanQuestionAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockSpokesmanQuestionAc = ( questionId, toast ) => {
  return async (dispatch) => {
    try {
      const respSpokesmanQuestionAc = await fetchWithToken(
        `ac-roles/api/spokesman-question-ac/${questionId}/block`, {}, 'DELETE' 
      );
      const bodySpokesmanQuestionAc = await respSpokesmanQuestionAc.json();

      if ( bodySpokesmanQuestionAc.ok ) {
        dispatch( blockSpokesmanQuestionAc( questionId ) );
        getToastMsg(toast, 'success', bodySpokesmanQuestionAc.message );
      } else if (bodySpokesmanQuestionAc.detail) {
        Swal.fire(
          'Error', bodySpokesmanQuestionAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setSpokesmanQuestionAcList = ( spokesmanQuestions ) => ({
  type: acRolesTypes.acSpokesmanQuestionList,
  payload: spokesmanQuestions
});
    
export const startRemoveSpokesmanQuestionAcList = () => ({
  type: acRolesTypes.acSpokesmanQuestionRemove
});

const startLoadingSpokesmanQuestionAc = () => ({
  type: acRolesTypes.acSpokesmanQuestionLoad
});

const endLoadingSpokesmanQuestionAc = () => ({
  type: acRolesTypes.acSpokesmanQuestionStop
});

const addNewSpokesmanQuestionAc = ( spokesmanQuestion ) => ({
  type: acRolesTypes.acSpokesmanQuestionNew,
  payload: spokesmanQuestion
});

const blockSpokesmanQuestionAc = ( spokesmanQuestionId ) => ({
  type: acRolesTypes.acSpokesmanQuestionBlock,
  payload: spokesmanQuestionId
});