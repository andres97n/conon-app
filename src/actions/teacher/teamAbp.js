import Swal from "sweetalert2";

import { fetchWithToken } from "../../helpers/fetch";
import { methodologyTypes } from "../../types/methodologyTypes";
import { changeDate, getError } from "../../helpers/admin";
import { 
    getTeamAbpData, 
    getTeamAbpDetailData, 
    getTeamAbpDetailErrorMessage, 
    getTeamAbpErrorMessage,
    getTeamDetailsAbpWithTeamAbpId,
    getToastMsg, 
} from "../../helpers/abp";
import { endLoadingTopics, setTopicStudents, startLoadingTopics } from "../admin/topic";

export const startLoadTeamAbpList = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTeamAbp() );
            const resp_team_abp = await fetchWithToken( 'abp/api/team-abp/' );
            const body_team_abp = await resp_team_abp.json();
    
            if (body_team_abp.ok) {
                dispatch( setTeamAbpList( changeDate(body_team_abp.conon_data)));
                dispatch( endLoadingTeamAbp() );
            } else {
                Swal.fire('Error', body_team_abp.detail, 'error');
                dispatch( endLoadingTeamAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTeamAbp() );
        }
    }
}

export const startLoadCurrentTeamAbp = ( abpId, userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTeamAbp() );
            const resp_team_dua = await fetchWithToken( 
                `abp/api/path/team-abp/student-team-abp/${abpId}/${userId}/` 
            );
            const body_team_abp = await resp_team_dua.json();
    
            if (body_team_abp.ok) {
                if (body_team_abp.conon_data) {
                    dispatch( setTeamAbpDetailList( body_team_abp.conon_data ));
                }
                dispatch( endLoadingTeamAbp() );
            } else {
                Swal.fire('Error', body_team_abp.detail, 'error');
                dispatch( endLoadingTeamAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTeamAbp() );
        }
    }
}

export const startLoadTeamAbpWithDetails = ( abpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_team_dua = await fetchWithToken( 
                `abp/api/path/team-abp/team-abp-with-students/${abpId}/` 
            );
            const body_team_abp = await resp_team_dua.json();
    
            if (body_team_abp.ok) {
                if (body_team_abp.conon_data) {
                    dispatch( setTopicStudents( body_team_abp.conon_data ));
                }
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_team_abp.detail, 'error');
                dispatch( endLoadingTopics() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startSaveTeamAbp = ( teamAbp, teamDetailAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_team_abp = await fetchWithToken( 
                'abp/api/team-abp/', teamAbp, 'POST'  
            );
            const body_team_abp = await resp_team_abp.json();

            if ( body_team_abp.ok ) {
                const newTeamAbp = { ...teamAbp, id: body_team_abp.id }; 
                dispatch( addNewTeamAbp(
                    { team_abp: newTeamAbp, students: [] }
                ));
                dispatch( startSaveTeamAbpDetail( 
                    body_team_abp.id, teamDetailAbp, body_team_abp.message, toast
                ));
            } else if ( body_team_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_team_abp.detail, getTeamAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_team_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateTeamAbp = ( teamAbpId, teamAbp, toast ) => {
    return async (dispatch) => {
        try {
            const resp_team_abp = await fetchWithToken( 
                `abp/api/team-abp/${teamAbpId}/`, 
                {
                    abp: teamAbpId,
                    step: teamAbp.step,
                    state: teamAbp.state || 1,
                    observations: teamAbp.observations || null
                }, 
                'PUT'  
            );
            const body_team_abp = await resp_team_abp.json();

            if ( body_team_abp.ok ) {
                dispatch( updateTeamAbp( getTeamAbpData( teamAbp, teamAbpId ) ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Grupo Actualizado Correctamente', 
                    life: 4000 });
                
            } else if ( body_team_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_team_abp.detail, getTeamAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_team_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startNextStepTeamAbp = (teamAbp, teamDetailId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_team_abp = await fetchWithToken( 
                `abp/api/team-abp/${teamDetailId}/`,
                teamAbp, 
                'PUT'  
            );
            const body_team_abp = await resp_team_abp.json();

            if ( body_team_abp.ok ) {
                dispatch( updateTeamAbpNextStep( teamAbp.step ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: (teamAbp.step === 8) 
                        ? 'ABP finalizado correctamente' 
                        : 'Progreso del equipo guardado correctamente', 
                    life: 4000 });
                
            } else if ( body_team_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_team_abp.detail, getTeamAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_team_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteTeamAbp = ( teamAbpId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_team_abp = await fetchWithToken(
                `abp/api/team-abp/${teamAbpId}/`, 
                {}, 
                'DELETE' );
            const body_team_abp = await resp_team_abp.json();

            if ( body_team_abp.ok ) {
                dispatch( deleteTeamAbp( teamAbpId ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_team_abp.message, 
                    life: 4000 });

            } else if (body_team_abp.detail) {
                Swal.fire(
                    'Error', body_team_abp.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveTeamAbpDetail = ( teamAbpId, teamAbpDetail, msg, toast ) => {
    return async ( dispatch ) => {
        try {
            const newTeamDetailsAc = getTeamDetailsAbpWithTeamAbpId( 
                teamAbpDetail, teamAbpId 
            );
            const resp_team_abp = await fetchWithToken( 
                'abp/api/team-detail-abp/', newTeamDetailsAc, 'POST'  
            );
            const body_team_abp = await resp_team_abp.json();

            if ( body_team_abp.ok ) {
                dispatch( addNewTeamAbpDetail( body_team_abp.team_detail_abp ));
                getToastMsg(toast, 'success', msg );
            } else if ( body_team_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_team_abp.detail, getTeamAbpDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_team_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateTeamAbpDetail = ( teamAbpDetailId, teamAbpDetail, toast ) => {
    return async (dispatch) => {
        try {
            const resp_team_abp = await fetchWithToken( 
                `abp/api/rubric-detail-abp/${teamAbpDetailId}/`, 
                {
                    team_abp: teamAbpDetail.teamAbp,
                    user: teamAbpDetail.user,
                    is_moderator: teamAbpDetail.is_moderator,
                    active: teamAbpDetail.active || true
                }, 
                'PUT'  
            );
            const body_team_abp = await resp_team_abp.json();

            if ( body_team_abp.ok ) {
                dispatch( updateTeamAbpDetail( 
                    getTeamAbpDetailData( teamAbpDetail, teamAbpDetailId ) 
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Estudiante Agregado Correctamente', 
                    life: 4000 });
                
            } else if ( body_team_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_team_abp.detail, getTeamAbpDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_team_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setTeamAbpList = ( teamsAbp ) => ({
    type: methodologyTypes.teamAbpList,
    payload: teamsAbp
});

export const startRemoveTeamAbpList = () => ({
    type: methodologyTypes.teamAbpRemove
});

const startLoadingTeamAbp = () => ({
    type: methodologyTypes.teamAbpLoad
});

const endLoadingTeamAbp = () => ({
    type: methodologyTypes.teamAbpStop
});

const addNewTeamAbp = ( teamAbp ) => ({
    type: methodologyTypes.teamAbpNew,
    payload: teamAbp
});

const updateTeamAbp = ( teamAbp ) => ({
    type: methodologyTypes.teamAbpUpdate,
    payload: teamAbp
});

const deleteTeamAbp = ( teamAbpId ) => ({
    type: methodologyTypes.teamAbpDelete,
    payload: teamAbpId
});

const setTeamAbpDetailList = ( teamDetailList ) => ({
    type: methodologyTypes.teamDetailAbpList,
    payload: teamDetailList
});

export const startRemoveTeamAbpDetailList = () => ({
    type: methodologyTypes.teamDetailAbpRemove
});

const addNewTeamAbpDetail = ( teamAbpDetail ) => ({
    type: methodologyTypes.teamDetailAbpNew,
    payload: teamAbpDetail
});

const updateTeamAbpDetail = ( teamAbpDetail ) => ({
    type: methodologyTypes.teamDetailAbpUpdate,
    payload: teamAbpDetail 
});

const updateTeamAbpNextStep = ( stepTeamAbp ) => ({
    type: methodologyTypes.teamAbpNextStep,
    payload: stepTeamAbp
});