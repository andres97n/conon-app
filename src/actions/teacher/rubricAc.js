import Swal from "sweetalert2";

import { getToastMsg } from "../../helpers/abp";
import { changeDate, getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { acMethodologyTypes } from "../../types/acMethodologyTypes";
import { 
  getRubricAcErrorMessage, 
  getRubricDetailAcErrorMessage, 
  getRubricDetailsAcWithTeamAcId 
} from "../../helpers/ac";

export const startLoadRubricAcList = () => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingRubricAc() );
      const respRubricAc = await fetchWithToken( 'ac/api/rubric-ac/' );
      const bodyRubricAc = await respRubricAc.json();

      if (bodyRubricAc.ok) {
        dispatch( setRubricAcList( changeDate( bodyRubricAc.conon_data )));
        dispatch( endLoadingRubricAc() );
      } else {
        Swal.fire('Error', bodyRubricAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadRubricByAc = ( acId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingRubricAc() );
      const respRubricAc = await fetchWithToken( 
        `ac/api/rubric-ac?ac=${acId}&state=1` 
      );
      const bodyRubricAc = await respRubricAc.json();

      if (bodyRubricAc.ok) {
        if (bodyRubricAc.conon_data) {
          dispatch( setRubricAcList( bodyRubricAc.conon_data ));
        }
        dispatch( endLoadingRubricAc() );
      } else {
        Swal.fire('Error', bodyRubricAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadCurrentRubricAc = ( acId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingRubricDetailAc() );
      const respRubricAc = await fetchWithToken( 
        `ac/api/path/rubric-ac/current-rubric-ac/${acId}/` 
      );
      const bodyRubricAc = await respRubricAc.json();

      if (bodyRubricAc.ok) {
        if (bodyRubricAc.conon_data) {
          dispatch( setRubricDetailAcList( bodyRubricAc.conon_data ));
        }
        dispatch( endLoadingRubricDetailAc() );
      } else {
        Swal.fire('Error', bodyRubricAc.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveRubricAc = ( rubricAc, rubricDetailsAc, toast ) => {
  return async ( dispatch ) => {
    try {
    const respRubricAc = await fetchWithToken( 
      'ac/api/rubric-ac/', rubricAc, 'POST'  
    );
    const bodyRubricAc = await respRubricAc.json();

    if ( bodyRubricAc.ok ) {
      dispatch( addNewRubricAc( { ...rubricAc, id: bodyRubricAc.id } ));
      dispatch( startSaveRubricDetailAc( 
        bodyRubricAc.id, rubricDetailsAc, bodyRubricAc.message, toast
      ));
      } else if ( bodyRubricAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyRubricAc.detail, getRubricAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', `${bodyRubricAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockRubricAc = ( rubricAcId, toast ) => {
  return async (dispatch) => {
    try {
      const respRubricAc = await fetchWithToken(
        `ac/api/rubric-ac/${rubricAcId}/block/`, {}, 'DELETE' 
      );
      const bodyRubricAc = await respRubricAc.json();

      if ( bodyRubricAc.ok ) {
        dispatch( blockRubricAc( rubricAcId ) );
        getToastMsg(toast, 'success', bodyRubricAc.message );
      } else if (bodyRubricAc.detail) {
        Swal.fire(
          'Error', bodyRubricAc.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveRubricDetailAc = ( rubricAcId, rubricDetailsAc, msg, toast ) => {
  return async ( dispatch ) => {
    try {
      const newRubricDetailsAc = getRubricDetailsAcWithTeamAcId( 
        rubricDetailsAc, rubricAcId 
      );
      const respRubricAc = await fetchWithToken( 
        'ac/api/rubric-detail-ac/', newRubricDetailsAc, 'POST'  
      );
      const bodyRubricAc = await respRubricAc.json();

      if ( bodyRubricAc.ok ) {
        dispatch( addNewRubricDetailAc( bodyRubricAc.rubric_detail_abp ));
        getToastMsg(toast, 'success', msg );
      } else if ( bodyRubricAc.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyRubricAc.detail, getRubricDetailAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
        'Error', `${bodyRubricAc}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockRubricDetailAc = ( rubricDetailAcId, toast ) => {
  return async (dispatch) => {
    try {
      const respRubricAc = await fetchWithToken(
        `ac/api/rubric-detail-ac/${rubricDetailAcId}/block/`, {}, 'DELETE' 
      );
      const bodyRubricAc = await respRubricAc.json();

      if ( bodyRubricAc.ok ) {
        dispatch( blockRubricDetailAc( rubricDetailAcId ) );
        getToastMsg(toast, 'success', bodyRubricAc.message );
      } else if (bodyRubricAc.detail) {
        Swal.fire(
          'Error', bodyRubricAc.detail, 'error'
        ); 
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const startLoadingRubricAc = () => ({
  type: acMethodologyTypes.rubricAcLoad
});
  
  const endLoadingRubricAc = () => ({
    type: acMethodologyTypes.rubricAcStop
  });
  
  const setRubricAcList = ( rubricAcList ) => ({
    type: acMethodologyTypes.rubricAcList,
    payload: rubricAcList
  });
    
  export const startRemoveRubricAcList = () => ({
    type: acMethodologyTypes.rubricAcRemove
  });
  
  const addNewRubricAc = ( rubricAc ) => ({
    type: acMethodologyTypes.rubricAcNew,
    payload: rubricAc
  });
  
//   const updateRubricAc = ( rubricAc ) => ({
//     type: acMethodologyTypes.rubricAcUpdate,
//     payload: rubricAc
//   });

  const blockRubricAc = ( rubricAcId ) => ({
    type: acMethodologyTypes.rubricAcBlock,
    payload: rubricAcId
  });
  
  const startLoadingRubricDetailAc = () => ({
    type: acMethodologyTypes.rubricDetailAcLoad
  });
  
  const endLoadingRubricDetailAc = () => ({
    type: acMethodologyTypes.rubricDetailAcStop
  });

  const setRubricDetailAcList = ( rubricDetailList ) => ({
    type: acMethodologyTypes.rubricDetailAcList,
    payload: rubricDetailList
  });
  
  export const startRemoveRubricDetailAcList = () => ({
    type: acMethodologyTypes.rubricDetailAcRemove
  });
  
  const addNewRubricDetailAc = ( rubricDetailAc ) => ({
    type: acMethodologyTypes.rubricDetailAcNew,
    payload: rubricDetailAc
  });

//   const updateRubricDetailAc = ( rubricDetailAc ) => ({
//     type: acMethodologyTypes.rubricAcUpdate,
//     payload: rubricDetailAc
//   });
  
  const blockRubricDetailAc = ( rubricDetailAcId ) => ({
    type: acMethodologyTypes.rubricDetailAcBlock,
    payload: rubricDetailAcId
  });