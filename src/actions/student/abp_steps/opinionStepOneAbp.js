import Swal from "sweetalert2";

import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { changeDate, getError } from "../../../helpers/admin";
import { getInteractionStepOneAbpDetailErrorMessage, getManyOpinionStepOneAbpDetailErrorMessage, getOpinionStepOneAbpData, getOpinionStepOneAbpErrorMessage } from "../../../helpers/abp-steps";
import { fetchWithToken } from "../../../helpers/fetch";

export const startLoadOpinionStepOneAbpList = ( teamDetailId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingOpinionStepOneAbp() );
            const resp_opinion_abp = await fetchWithToken( 
                `abp-steps/api/path/step-one/opinion/user-opinions/${teamDetailId}/` 
            );
            const body_opinion_abp = await resp_opinion_abp.json();
    
            if (body_opinion_abp.ok) {
                dispatch( setOpinionStepOneAbpList( changeDate(body_opinion_abp.conon_data)));
                dispatch( endLoadingOpinionStepOneAbp() );
            } else {
                Swal.fire('Error', body_opinion_abp.detail, 'error');
                dispatch( endLoadingOpinionStepOneAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingOpinionStepOneAbp() );
        }
    }
}

export const startLoadOpinionStepOneAbpDetailList = ( teamId, userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingOpinionStepOneAbp() );
            const resp_opinion_abp = await fetchWithToken(
                `abp-steps/api/path/step-one/opinion/user-opinions-interactions/${teamId}/${userId}/`
            );
            const body_opinion_abp = await resp_opinion_abp.json();
    
            if (body_opinion_abp.ok) {
                dispatch( setInteractionStepOneAbpList(
                    body_opinion_abp.conon_data
                ));
                dispatch( endLoadingOpinionStepOneAbp() );
            } else {
                Swal.fire('Error', body_opinion_abp.detail, 'error');
                dispatch( endLoadingOpinionStepOneAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingOpinionStepOneAbp() );
        }
    }
}

export const startLoadOpinionStepOneAbpCount = ( teamDetailId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingOpinionStepOneAbp() );
            const resp_opinion_abp = await fetchWithToken(
                `abp-steps/api/path/step-one/opinion/user-opinions-count/${teamDetailId}/`
            );
            const body_opinion_abp = await resp_opinion_abp.json();
    
            if (body_opinion_abp.ok) {
                dispatch( setOpinionStepOneAbpCount(
                    body_opinion_abp.conon_data
                ));
                dispatch( endLoadingOpinionStepOneAbp() );
            } else {
                Swal.fire('Error', body_opinion_abp.detail, 'error');
                dispatch( endLoadingOpinionStepOneAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingOpinionStepOneAbp() );
        }
    }
}

export const startLoadTeamOpinionsAndInteractionsStepOneAbp = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingOpinionStepOneAbp() );
            const resp_opinion_abp = await fetchWithToken(
                `abp-steps/api/path/step-one/opinion/team-opinions-interactions/${teamId}/`
            );
            const body_opinion_abp = await resp_opinion_abp.json();
    
            if (body_opinion_abp.ok) {
                dispatch( setInteractionStepOneAbpList(
                    body_opinion_abp.conon_data
                ));
                dispatch( endLoadingOpinionStepOneAbp() );
            } else {
                Swal.fire('Error', body_opinion_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveOpinionStepOneAbp = ( opinionAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_opinion_abp = await fetchWithToken( 
                'abp-steps/api/step-one/opinion/', 
                opinionAbp, 
                'POST'  
            );
            const body_opinion_abp = await resp_opinion_abp.json();

            if ( body_opinion_abp.ok ) {

                dispatch(addNewOpinionStepOneAbp( 
                    getOpinionStepOneAbpData(opinionAbp, body_opinion_abp.id) 
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_opinion_abp.message, 
                    life: 4000 });
                
            } else if ( body_opinion_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_opinion_abp.detail, getOpinionStepOneAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_opinion_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startSaveManyOpinionStepOneAbp = ( opinionAbpList, toast ) => {
    return async ( dispatch ) => {
        console.log('entro multiple');
        try {
            const resp_opinion_abp = await fetchWithToken( 
                'abp-steps/api/step-one/opinion/create-many/', 
                opinionAbpList, 
                'POST'  
            );
            const body_opinion_abp = await resp_opinion_abp.json();

            if ( body_opinion_abp.ok ) {

                body_opinion_abp.opinions.forEach( opinion => {
                    dispatch( addNewOpinionStepOneAbp(
                        getOpinionStepOneAbpData( opinion, opinion.id )
                    ));
                });

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_opinion_abp.message, 
                    life: 4000 });
                
            } else if ( body_opinion_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError(
                        body_opinion_abp.detail, 
                        getManyOpinionStepOneAbpDetailErrorMessage
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_opinion_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateOpinionStepOneAbp = ( opinionId, opinionAbp, toast ) => {
    return async (dispatch) => {
        try {
            const resp_opinion_abp = await fetchWithToken( 
                `abp-steps/api/step-one/opinion/${opinionId}/`, 
                {
                    team_detail_abp: opinionAbp.team_detail_abp,
                    opinion: opinionAbp.opinion,
                    active: opinionAbp.active || false
                }, 
                'PUT'  
            );
            const body_opinion_abp = await resp_opinion_abp.json();

            if ( body_opinion_abp.ok ) {
                dispatch( updateOpinionStepOneAbp(body_opinion_abp.conon_data));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Rúbrica Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_opinion_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_opinion_abp.detail, getOpinionStepOneAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_opinion_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startBlockOpinionStepOneAbp = ( opinionId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_opinion_abp = await fetchWithToken( 
                `abp-steps/api/step-one/opinion/${opinionId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_opinion_abp = await resp_opinion_abp.json();

            if ( body_opinion_abp.ok ) {
                dispatch( blockOpinionStepOneAbp(opinionId));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_opinion_abp.message, 
                    life: 4000 });
                
            } else if ( body_opinion_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_opinion_abp.detail, 
                    'error'
                );
            } 
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startUpdateInteractionStepOneAbp = ( interactionAbp, opinionAbp ) => {
    return async ( dispatch ) => {
        try {
            const resp_opinion_abp = await fetchWithToken( 
                `abp-steps/api/step-one/interaction/${interactionAbp.id}/`, 
                {
                    user: interactionAbp.user,
                    opinion_step_one_abp: interactionAbp.opinion_step_one_abp,
                    opinion_interaction: interactionAbp.opinion_interaction
                }, 
                'PUT'  
            );
            const body_opinion_abp = await resp_opinion_abp.json();

            if ( body_opinion_abp.ok ) {

                dispatch(updateInteractionStepOneAbp(opinionAbp));
                
            } else if ( body_opinion_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_opinion_abp.detail, 
                        getInteractionStepOneAbpDetailErrorMessage 
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_opinion_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

const setOpinionStepOneAbpList = ( opinionAbpList ) => ({
    type: abpStepsTypes.opinionStepOneList,
    payload: opinionAbpList
});

export const startRemoveOpinionStepOneAbpList = () => ({
    type: abpStepsTypes.opinionStepOneRemove
});

const startLoadingOpinionStepOneAbp = () => ({
    type: abpStepsTypes.opinionStepOneLoad
});

const endLoadingOpinionStepOneAbp = () => ({
    type: abpStepsTypes.opinionStepOneStop
});

const addNewOpinionStepOneAbp = ( opinionAbp ) => ({
    type: abpStepsTypes.opinionStepOneNew,
    payload: opinionAbp
});

const updateOpinionStepOneAbp = ( opinionAbp ) => ({
    type: abpStepsTypes.opinionStepOneUpdate,
    payload: opinionAbp
});

const blockOpinionStepOneAbp = ( opinionAbpId ) => ({
    type: abpStepsTypes.opinionStepOneBlock,
    payload: opinionAbpId
});

const setInteractionStepOneAbpList = ( interactionAbpDetailList ) => ({
    type: abpStepsTypes.interactionStepOneList,
    payload: interactionAbpDetailList
});

export const startRemoveInteractionStepOneAbpList = () => ({
    type: abpStepsTypes.interactionStepOneRemove
});

const updateInteractionStepOneAbp = ( interactionAbpDetail ) => ({
    type: abpStepsTypes.interactionStepOneUpdate,
    payload: interactionAbpDetail
});

const setOpinionStepOneAbpCount = ( opinionsCount ) => ({
    type: abpStepsTypes.opinionStepOneNewCount,
    payload: opinionsCount
});

export const endRemoveOpinionStepOneAbpCount = () => ({
    type: abpStepsTypes.opinionStepOneRemoveCount
});