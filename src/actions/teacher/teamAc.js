import Swal from "sweetalert2";

import { getToastMsg } from "../../helpers/abp";
import { changeDate, getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { acMethodologyTypes } from "../../types/acMethodologyTypes";
import { 
  getTeamAcErrorMessage, 
  getTeamDetailAcErrorMessage, 
  getTeamDetailsAcWithTeamAcId 
} from "../../helpers/ac";
import { setTopicStudents } from "../admin/topic";

export const startLoadTeamAcList = () => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingTeamAc() );
      const resp_team_ac = await fetchWithToken( 'ac/api/team-ac/' );
      const body_team_ac = await resp_team_ac.json();

      if (body_team_ac.ok) {
        dispatch( setTeamAcList( changeDate(body_team_ac.conon_data)));
        dispatch( endLoadingTeamAc() );
      } else {
        Swal.fire('Error', body_team_ac.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadCurrentTeamAc = ( abcId, userId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingTeamAc() );
      const resp_team_ac = await fetchWithToken( 
        `ac/api/path/team-ac/student-team-ac/${abcId}/${userId}/` 
      );
      const body_team_ac = await resp_team_ac.json();

      if (body_team_ac.ok) {
        if (body_team_ac.conon_data) {
          dispatch( setTeamAcDetailList( body_team_ac.conon_data ));
        }
        dispatch( endLoadingTeamAc() );
      } else {
        Swal.fire('Error', body_team_ac.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadUserAc = ( abcId, userId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingTeamDetailAc() );
      const resp_team_ac = await fetchWithToken( 
        `ac/api/path/team-detail-ac/user-ac/${abcId}/${userId}/` 
      );
      const body_team_ac = await resp_team_ac.json();

      if (body_team_ac.ok) {
        if (body_team_ac.conon_data) {
          dispatch( setTeamDetailAcUser( body_team_ac.conon_data ));
        }
        dispatch( endLoadingTeamDetailAc() );
      } else {
        Swal.fire('Error', body_team_ac.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadTeamAcWithStudents = ( acId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadTeamAcList() );
      const resp_team_ac = await fetchWithToken( 
        `ac/api/path/team-ac/team-ac-with-students/${acId}/` 
      );
      const body_team_ac = await resp_team_ac.json();

      if (body_team_ac.ok) {
        if (body_team_ac.conon_data) {
          dispatch( setTopicStudents( body_team_ac.conon_data ));
        }
        dispatch( endLoadingTeamDetailAc() );
      } else {
        Swal.fire('Error', body_team_ac.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveTeamAc = ( teamAc, teamDetailsAc, toast ) => {
  return async ( dispatch ) => {
    try {
      const resp_team_ac = await fetchWithToken( 
        'ac/api/team-ac/', teamAc, 'POST'  
      );
      const body_team_ac = await resp_team_ac.json();

      if ( body_team_ac.ok ) {
        dispatch( addNewTeamAc( { ...teamAc, id: body_team_ac.id } ));
        dispatch( startSaveTeamDetailAc( 
          body_team_ac.id, teamDetailsAc, body_team_ac.message, toast 
        ));
      } else if ( body_team_ac.detail ) {
        Swal.fire(
          'Error', 
          getError( body_team_ac.detail, getTeamAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
        'Error', `${body_team_ac}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockTeamAc = ( teamAcId, toast ) => {
  return async (dispatch) => {
    try {
      const resp_team_ac = await fetchWithToken(
        `ac/api/team-ac/${teamAcId}/block/`, {}, 'DELETE' 
      );
      const body_team_ac = await resp_team_ac.json();

      if ( body_team_ac.ok ) {
        dispatch( blockTeamAc( teamAcId ) );
        getToastMsg(toast, 'success', body_team_ac.message );
      } else if (body_team_ac.detail) {
        Swal.fire(
          'Error', body_team_ac.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveTeamDetailAc = ( teamAcId, teamDetailsAc, msg, toast ) => {
  return async ( dispatch ) => {
    try {
      const newTeamDetailsAc = getTeamDetailsAcWithTeamAcId( teamDetailsAc, teamAcId );
      const resp_team_ac = await fetchWithToken( 
        'ac/api/team-detail-ac/', newTeamDetailsAc, 'POST'  
      );
      const body_team_ac = await resp_team_ac.json();

      if ( body_team_ac.ok ) {
        dispatch( addNewTeamDetailAc( body_team_ac.team_detail_ac ));
        getToastMsg(toast, 'success', msg );
        
      } else if ( body_team_ac.detail ) {
        Swal.fire(
          'Error', 
          getError( body_team_ac.detail, getTeamDetailAcErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
        'Error', `${body_team_ac}, consulte con el Desarrollador.`, 'error'
        );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockTeamDetailAc = ( teamDetailAcId, toast ) => {
  return async (dispatch) => {
    try {
      const resp_team_ac = await fetchWithToken(
        `ac/api/team-detail-ac/${teamDetailAcId}/block/`, {}, 'DELETE' 
      );
      const body_team_ac = await resp_team_ac.json();

      if ( body_team_ac.ok ) {
        dispatch( blockTeamDetailAc( teamDetailAcId ) );
        getToastMsg(toast, 'success', body_team_ac.message );
      } else if (body_team_ac.detail) {
        Swal.fire(
          'Error', body_team_ac.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSetTeamFinishedWork = ( teamDetailId ) => {
  return async (dispatch) => {
    try {
      const resp_team_ac = await fetchWithToken(
        `ac/api/path/team-ac/team-ac-finished/${teamDetailId}/` 
      );
      const body_team_ac = await resp_team_ac.json();

      if ( body_team_ac.ok ) {
        if (body_team_ac.conon_data) {
          dispatch( setTeamFinished() );
        }
      } else if (body_team_ac.detail) {
        Swal.fire(
          'Error', body_team_ac.detail, 'error'
        );  
      }
        
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const startLoadingTeamAc = () => ({
  type: acMethodologyTypes.teamAcLoad
});

const endLoadingTeamAc = () => ({
  type: acMethodologyTypes.teamAcStop
});

const setTeamAcList = ( teamAcList ) => ({
  type: acMethodologyTypes.teamAcList,
  payload: teamAcList
});
  
export const startRemoveTeamAcList = () => ({
  type: acMethodologyTypes.teamAcRemove
});

const addNewTeamAc = ( teamAc ) => ({
  type: acMethodologyTypes.teamAcNew,
  payload: teamAc
});

const blockTeamAc = ( teamAcId ) => ({
  type: acMethodologyTypes.teamAcBlock,
  payload: teamAcId
});

const startLoadingTeamDetailAc = () => ({
  type: acMethodologyTypes.teamDetailAcLoad
});

const endLoadingTeamDetailAc = () => ({
  type: acMethodologyTypes.teamDetailAcStop
});

const setTeamAcDetailList = ( teamDetailList ) => ({
  type: acMethodologyTypes.teamDetailAcList,
  payload: teamDetailList
});

export const startRemoveTeamAcDetailList = () => ({
  type: acMethodologyTypes.teamDetailAcRemove
});

const addNewTeamDetailAc = ( teamDetailAc ) => ({
  type: acMethodologyTypes.teamDetailAcNew,
  payload: teamDetailAc
});

const blockTeamDetailAc = ( teamDetailAcId ) => ({
  type: acMethodologyTypes.teamDetailAcBlock,
  payload: teamDetailAcId
});

const setTeamDetailAcUser = ( userAc ) => ({
  type: acMethodologyTypes.teamDetailAcUserNew,
  payload: userAc
});

export const startRemoveTeamDetailAcUser = () => ({
  type: acMethodologyTypes.teamDetailAcUserRemove
});

const setTeamFinished = () => ({
  type: acMethodologyTypes.teamAcSetFinished,
});

export const startRemoveTeamFinished = () => ({
  type: acMethodologyTypes.teamAcRemoveFinished
});