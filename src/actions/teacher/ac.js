import Swal from "sweetalert2";

import { getToastMsg } from "../../helpers/abp";
import { getAcErrorMessage } from "../../helpers/ac";
import { changeDate, getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { acMethodologyTypes } from "../../types/acMethodologyTypes";
import { 
  endLoadingCurrentMethodology, 
  setCurrentMethodology, 
  startLoadingCurrentMethodology 
} from "../admin/topic";

export const startLoadAcList = () => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingAc() );
      const resp_dua = await fetchWithToken( 'ac/api/ac/' );
      const body_abp = await resp_dua.json();

      if (body_abp.ok) {
        dispatch( setAcList( changeDate(body_abp.conon_data)));
        dispatch( endLoadingAc() );
      } else {
        Swal.fire('Error', body_abp.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadCurrentAc = ( topicId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingAc() );
      const resp_ac = await fetchWithToken( `ac/api/ac/?topic=${topicId}` );
      const body_ac = await resp_ac.json();

      if (body_ac.ok) {
        dispatch( setCurrentMethodology( body_ac.conon_data[0] ));
        dispatch( endLoadingAc() );
      } else {
        Swal.fire('Error', body_ac.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadStudentEvaluationAc = ( topicId ) => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const { uid } = auth;
      dispatch( startLoadingCurrentMethodology() );
      const resp_ac = await fetchWithToken( 
        `ac/api/path/ac/student-evaluation-ac/${topicId}/${uid}/` 
      );
      const body_ac = await resp_ac.json();

      if (body_ac.ok) {
        dispatch( setCurrentMethodology( body_ac.conon_data[0] ));
        dispatch( endLoadingCurrentMethodology() );
      } else {
        Swal.fire('Error', body_ac.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveAc = ( topicId, ac, toast ) => {
  return async ( dispatch ) => {
    try {
      const newAc = { ...ac, topic: topicId };
      const resp_ac = await fetchWithToken( 
        'ac/api/ac/', newAc, 'POST'  
      );
      const body_ac = await resp_ac.json();

      if ( body_ac.ok ) {
        dispatch( addNewAc( 
          { ...newAc, id: body_ac.id }
        ));
        getToastMsg(toast, 'success', body_ac.message );
      } else if ( body_ac.detail ) {
        Swal.fire(
          'Error', 
          getError( body_ac.detail, getAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${body_ac}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startUpdateAc = ( ac, toast ) => {
  return async (dispatch) => {
    try {
      const resp_ac = await fetchWithToken( 
        `ac/api/ac/${ac.id}/`, ac, 'PUT'  
      );
      const body_ac = await resp_ac.json();

      if ( body_ac.ok ) {
        dispatch( updateAc( ac ));
        getToastMsg(toast, 'success', 'Metodología AC Actualizada Correctamente' );
      } else if ( body_ac.detail ) {
        Swal.fire(
          'Error', 
          getError( body_ac.detail, getAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${body_ac}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startDeleteAc = ( acId, toast ) => {
  return async (dispatch) => {
    try {
      const resp_ac = await fetchWithToken(
        `ac/api/ac/${acId}/`, {}, 'DELETE' 
      );
      const body_ac = await resp_ac.json();

      if ( body_ac.ok ) {
        dispatch( blockAc( acId ) );
        getToastMsg(toast, 'success', body_ac.message );
      } else if (body_ac.detail) {
        Swal.fire(
          'Error', body_ac.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setAcList = ( acList ) => ({
  type: acMethodologyTypes.acList,
  payload: acList
});

export const startRemoveAcList = () => ({
  type: acMethodologyTypes.acRemove
});

const startLoadingAc = () => ({
  type: acMethodologyTypes.acLoad
});

const endLoadingAc = () => ({
  type: acMethodologyTypes.acStop
});

const addNewAc = ( ac ) => ({
  type: acMethodologyTypes.acNew,
  payload: ac
});

const updateAc = ( ac ) => ({
  type: acMethodologyTypes.acUpdate,
  payload: ac
});

const blockAc = ( acId ) => ({
  type: acMethodologyTypes.acBlock,
  payload: acId
});

export const startRemoveCurrentAc = () => ({
  type: acMethodologyTypes.currentAcRemove
});