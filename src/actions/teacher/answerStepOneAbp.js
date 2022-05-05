import Swal from "sweetalert2";

import { getToastMsg } from "../../helpers/abp";
import { getAnswerAbpDataErrorMessage } from "../../helpers/abp-steps";
import { getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { abpStepsTypes } from "../../types/abpStepsTypes";

export const startLoadAnswersByTeamStepOneAbpList = ( teamId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingAnswerStepOneAbp() );
      const respAnswerAbp = await fetchWithToken( 
        `abp-steps/api/path/step-one/answer/answers-by-team/${teamId}/` 
      );
      const bodyAnswerAbp = await respAnswerAbp.json();
    
      if (bodyAnswerAbp.ok) {
        dispatch( setAnswerStepOneAbpList( bodyAnswerAbp.conon_data ));
        dispatch( endLoadingAnswerStepOneAbp() );
      } else {
        Swal.fire('Error', bodyAnswerAbp.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadAnswersByQuestionStepOneAbp = ( questionId ) => {
  return async (dispatch) => {
    try {
      const respAnswerAbp = await fetchWithToken( 
        `abp-steps/api/step-one/answer?question_step_one_abp=${questionId}` 
      );
      const bodyAnswerAbp = await respAnswerAbp.json();
    
      if (bodyAnswerAbp.ok) {
        dispatch( setAnswerStepOneAbpList( bodyAnswerAbp.conon_data ));
      } else {
        Swal.fire('Error', bodyAnswerAbp.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveAnswerStepOneAbp = ( answerAbp, toast ) => {
  return async ( dispatch ) => {
    try {
      const respAnswerAbp = await fetchWithToken( 
        'abp-steps/api/step-one/answer/', 
        answerAbp, 
        'POST'  
      );
      const bodyAnswerAbp = await respAnswerAbp.json();

      if ( bodyAnswerAbp.ok ) {
        dispatch( addNewAnswerStepOneAbp( 
          { ...answerAbp, 
            id: bodyAnswerAbp.id,
            question_step_one_abp: {
              id: answerAbp.question_step_one_abp
            },
            user: {
              id: answerAbp.user
            }, 
          } 
        ));
        getToastMsg(toast, 'success', bodyAnswerAbp.message );
      } else if ( bodyAnswerAbp.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyAnswerAbp.detail, getAnswerAbpDataErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyAnswerAbp}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

const startLoadingAnswerStepOneAbp = () => ({
  type: abpStepsTypes.answerStepOneLoad
});

const endLoadingAnswerStepOneAbp = () => ({
  type: abpStepsTypes.answerStepOneStop
});

const setAnswerStepOneAbpList = ( answerAbpList ) => ({
  type: abpStepsTypes.answerStepOneList,
  payload: answerAbpList
});

export const startRemoveAnswerStepOneAbpList = () => ({
  type: abpStepsTypes.answerStepOneRemove
});

const addNewAnswerStepOneAbp = ( answerAbp ) => ({
  type: abpStepsTypes.answerStepOneNew,
  payload: answerAbp
});

// const blockAnswerStepOneAbp = ( answerAbpId ) => ({
//   type: abpStepsTypes.answerStepOneBlock,
//   payload: answerAbpId
// });