import Swal from "sweetalert2";
import { getToastMsg } from "../../helpers/abp";

import { changeDate, getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { acMethodologyTypes } from "../../types/acMethodologyTypes";
import { 
  getEvaluationAcErrorMessage, 
  getEvaluationDetailAcErrorMessage, 
} from "../../helpers/ac";

export const startLoadStudentEvaluationAcList = ( rubric_ac, teamDetailAc ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingEvaluationAc() );
      const respEvaluationAc = await fetchWithToken( 
        `ac/api/student-evaluation-ac?rubric_ac=${rubric_ac}&team_detail_ac=${teamDetailAc}&state=1`       
      );
      const bodyEvaluationAc = await respEvaluationAc.json();

      if (bodyEvaluationAc.ok) {
        dispatch( setEvaluationAcList( changeDate( bodyEvaluationAc.conon_data )));
        dispatch( endLoadingEvaluationAc() );
      } else {
        Swal.fire('Error', bodyEvaluationAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadStudentEvaluationDetailAbpList = ( rubricId, teamDetailAcId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingEvaluationDetailAc() );
      const respEvaluationAc = await fetchWithToken( 
        `ac/api/path/student-evaluation-ac/current-student-evaluation-ac/${rubricId}/${teamDetailAcId}/` 
      );
      const bodyEvaluationAc = await respEvaluationAc.json();

      if (bodyEvaluationAc.ok) {
        dispatch( setEvaluationDetailAcList(( bodyEvaluationAc.conon_data )));
        dispatch( endLoadingEvaluationDetailAc() );
      } else {
        Swal.fire('Error', bodyEvaluationAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadStudentEvaluationAcByAcAndTeamDetail = ( acId, teamDetailAcId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingEvaluationAc() );
      const respEvaluationAc = await fetchWithToken( 
        `ac/api/path/student-evaluation-ac/current-student-evaluation-by-ac/${acId}/${teamDetailAcId}/` 
      );
      const bodyEvaluationAc = await respEvaluationAc.json();

      if (bodyEvaluationAc.ok) {
        dispatch( setEvaluationAcList(( bodyEvaluationAc.conon_data )));
        dispatch( endLoadingEvaluationAc() );
      } else {
        Swal.fire('Error', bodyEvaluationAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveStudentEvaluationAc = ( evaluationAc, evaluationDetailAc, toast ) => {
  return async ( dispatch ) => {
    try {
    const respEvaluationAc = await fetchWithToken( 
      'ac/api/student-evaluation-ac/', evaluationAc, 'POST'  
    );
    const bodyEvaluationAc = await respEvaluationAc.json();

    if ( bodyEvaluationAc.ok ) {
      dispatch( addNewEvaluationAc( { ...evaluationAc, id: bodyEvaluationAc.id } ));
      dispatch( startSaveStudentEvaluationDetailAc( 
        bodyEvaluationAc.id, evaluationDetailAc, bodyEvaluationAc.message, toast
      ));
      } else if ( bodyEvaluationAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyEvaluationAc.detail, getEvaluationAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyEvaluationAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startUpdateEvaluationAc = ( 
  evaluationAc, evaluationId, evaluationDetailAc, toast 
) => {
  return async ( dispatch ) => {
    try {
      const resp_evaluation_ac = await fetchWithToken( 
        `ac/api/student-evaluation-ac/${evaluationId}/`, 
        evaluationAc, 
        'PUT'  
      );
      const body_evaluation_ac = await resp_evaluation_ac.json();

      if ( body_evaluation_ac.ok ) {
        dispatch( updateEvaluationAc( evaluationAc ));
        dispatch( startSaveStudentEvaluationDetailAc( 
          evaluationId, 
          evaluationDetailAc, 
          'Calificación Actualizada Correctamente', 
          toast 
        ));
      } else if ( body_evaluation_ac.detail ) {
        Swal.fire(
          'Error',
          getError( body_evaluation_ac.detail, getEvaluationAcErrorMessage ),
          'error'
        );
      } else {
        Swal.fire(
          'Error', 
          `${body_evaluation_ac}, consulte con el Desarrollador.`, 
          'error'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
      }
  }
}

export const startBlockStudentEvaluationAc = ( evaluationAcId, toast ) => {
  return async (dispatch) => {
    try {
      const respEvaluationAc = await fetchWithToken(
        `ac/api/student-evaluation-ac/${evaluationAcId}/block/`, {}, 'DELETE' 
      );
      const bodyEvaluationAc = await respEvaluationAc.json();

      if ( bodyEvaluationAc.ok ) {
        dispatch( blockEvaluationAc( evaluationAcId ) );
        getToastMsg(toast, 'success', bodyEvaluationAc.message );
      } else if (bodyEvaluationAc.detail) {
        Swal.fire(
          'Error', bodyEvaluationAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveStudentEvaluationDetailAc = ( 
  evaluationAcId, evaluationDetailAc, msg, toast 
) => {
  return async ( dispatch ) => {
    try {
      const newEvaluationDetailAc = {
        ...evaluationDetailAc,
        student_evaluation_ac: evaluationAcId 
      };
      const respEvaluationAc = await fetchWithToken( 
        'ac/api/student-evaluation-detail-ac/', newEvaluationDetailAc, 'POST'  
      );
      const bodyEvaluationAc = await respEvaluationAc.json();

      if ( bodyEvaluationAc.ok ) {
        dispatch( addNewEvaluationDetailAc( { 
          ...newEvaluationDetailAc, id: bodyEvaluationAc.evaluation_detail_abp 
        } ));
        getToastMsg(toast, 'success', msg );
      } else if ( bodyEvaluationAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyEvaluationAc.detail, getEvaluationDetailAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
        'Error', `${bodyEvaluationAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockStudentEvaluationDetailAc = ( evaluationAcId, toast ) => {
  return async (dispatch) => {
    try {
      const respEvaluationAc = await fetchWithToken(
        `ac/api/student-evaluation-detail-ac/${evaluationAcId}/block/`, {}, 'DELETE' 
      );
      const bodyEvaluationAc = await respEvaluationAc.json();

      if ( bodyEvaluationAc.ok ) {
        dispatch( blockEvaluationDetailAc( evaluationAcId ) );
        getToastMsg(toast, 'success', bodyEvaluationAc.message );
      } else if (bodyEvaluationAc.detail) {
        Swal.fire(
          'Error', bodyEvaluationAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

  const startLoadingEvaluationAc = () => ({
    type: acMethodologyTypes.evaluationAcLoad
  });
  
  const endLoadingEvaluationAc = () => ({
    type: acMethodologyTypes.evaluationAcStop
  });
  
  const setEvaluationAcList = ( evaluationAcList ) => ({
    type: acMethodologyTypes.evaluationAcList,
    payload: evaluationAcList
  });
    
  export const startRemoveEvaluationAcList = () => ({
    type: acMethodologyTypes.evaluationAcRemove
  });
  
  const addNewEvaluationAc = ( evaluationAc ) => ({
    type: acMethodologyTypes.evaluationAcNew,
    payload: evaluationAc
  });

  const updateEvaluationAc = ( evaluationAc ) => ({
    type: acMethodologyTypes.evaluationAcUpdate,
    payload: evaluationAc
  });

  const blockEvaluationAc = ( evaluationAcId ) => ({
    type: acMethodologyTypes.evaluationAcBlock,
    payload: evaluationAcId
  });
  
  const startLoadingEvaluationDetailAc = () => ({
    type: acMethodologyTypes.evaluationDetailAcLoad
  });
  
  const endLoadingEvaluationDetailAc = () => ({
    type: acMethodologyTypes.evaluationDetailAcStop
  });

  const setEvaluationDetailAcList = ( evaluationDetailList ) => ({
    type: acMethodologyTypes.evaluationDetailAcList,
    payload: evaluationDetailList
  });
  
  export const startRemoveEvaluationDetailAcList = () => ({
    type: acMethodologyTypes.evaluationDetailAcRemove
  });
  
  const addNewEvaluationDetailAc = ( EvaluationDetailAc ) => ({
    type: acMethodologyTypes.evaluationDetailAcNew,
    payload: EvaluationDetailAc
  });

  const blockEvaluationDetailAc = ( evaluationDetailAcId ) => ({
    type: acMethodologyTypes.evaluationDetailAcBlock,
    payload: evaluationDetailAcId
  });