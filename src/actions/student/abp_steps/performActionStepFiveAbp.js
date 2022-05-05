import Swal from "sweetalert2";

import { fetchWithToken } from "../../../helpers/fetch";
import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { getError } from "../../../helpers/admin";
import { 
    getPerformActionAbpDataErrorMessage, 
    getPerformActionAbpDataManyErrorMessage, 
    getPerformActionStepFiveAbpData, 
    getRatePerformActionAbpDataErrorMessage,
    getRatePerformActionStepFiveAbpData
} from "../../../helpers/abp-steps";

export const startLoadStudentPerformActionStepFiveAbpList = ( teamDetailId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingPerformActionStepFiveAbp() );
            const resp_perform_action_abp = await fetchWithToken( 
                `abp-steps/api/path/step-five/perform-action/student-perform-actions/${teamDetailId}/` 
            );
            const body_perform_action_abp = await resp_perform_action_abp.json();
    
            if (body_perform_action_abp.ok) {
                dispatch( setPerformActionStepFiveAbpList((
                    body_perform_action_abp.conon_data
                )));
                dispatch( endLoadingPerformActionStepFiveAbp() );
            } else {
                Swal.fire('Error', body_perform_action_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadTeamPerformActionStepFiveAbpListExcludeStudent = ( teamId, userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRatePerformActionStepFiveAbp() );
            const resp_perform_action_abp = await fetchWithToken( 
                `abp-steps/api/path/step-five/perform-action/team-perform-actions-rates-user/${teamId}/${userId}/` 
            );
            const body_perform_action_abp = await resp_perform_action_abp.json();
    
            if (body_perform_action_abp.ok) {
                dispatch( setRatePerformActionStepFiveAbpList((
                    body_perform_action_abp.conon_data
                )));
                dispatch( endLoadingRatePerformActionStepFiveAbp() );
            } else {
                Swal.fire('Error', body_perform_action_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadTeamPerformActionsAndRatesStepFiveAbpList = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingPerformActionStepFiveAbp() );
            const resp_perform_action_abp = await fetchWithToken( 
                `abp-steps/api/path/step-five/perform-action/team-perform-actions-rates/${teamId}/` 
            );
            const body_perform_action_abp = await resp_perform_action_abp.json();
    
            if (body_perform_action_abp.ok) {
                dispatch( setPerformActionStepFiveAbpList((
                    body_perform_action_abp.conon_data
                )));
                dispatch( endLoadingPerformActionStepFiveAbp() );
            } else {
                Swal.fire('Error', body_perform_action_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSavePerformActionStepFiveAbp = ( performAction, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_perform_action_abp = await fetchWithToken( 
                'abp-steps/api/step-five/perform-action/', 
                performAction, 
                'POST'  
            );
            const body_perform_action_abp = await resp_perform_action_abp.json();

            if ( body_perform_action_abp.ok ) {
                if (typeof body_perform_action_abp.perform_action === 'number') {
                    dispatch( addNewPerformActionStepFiveAbp( 
                        getPerformActionStepFiveAbpData(
                            performAction, 
                            body_perform_action_abp.perform_action
                        ) 
                    ));
                } else if (Array.isArray(body_perform_action_abp.perform_action)) {
                    body_perform_action_abp.perform_action.forEach( action => {
                        dispatch( addNewPerformActionStepFiveAbp(
                            getPerformActionStepFiveAbpData( action, action.id )
                        ));
                    });
                }
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_perform_action_abp.message, 
                    life: 4000 });
                
            } else if ( body_perform_action_abp.detail ) {
                Swal.fire(
                    'Error',
                    (Array.isArray(body_perform_action_abp.detail))
                        ? (
                            getPerformActionAbpDataErrorMessage()
                        )
                        : (
                            getError( 
                                body_perform_action_abp.detail, 
                                getPerformActionAbpDataManyErrorMessage 
                            )

                        ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_perform_action_abp}, consulte con el Desarrollador.`, 
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

export const startBlockPerformActionStepFiveAbp = ( performActionId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_perform_action_abp = await fetchWithToken( 
                `abp-steps/api/step-five/perform-action/${performActionId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_perform_action_abp = await resp_perform_action_abp.json();

            if ( body_perform_action_abp.ok ) {
                dispatch( blockPerformActionStepFiveAbp(performActionId) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_perform_action_abp.message, 
                    life: 4000 });
                
            } else if ( body_perform_action_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_perform_action_abp.detail, 
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

export const startUpdateRatePerformActionStepFiveAbp = ( 
    performActionId, ratingId, ratePerformActionAbp, 
) => {
    return async ( dispatch ) => {
        try {
            const resp_perform_action_abp = await fetchWithToken( 
                `abp-steps/api/step-five/rate-perform-action/${ratingId}/`, 
                {
                    perform_action_step_five_abp: performActionId,
                    user: ratePerformActionAbp.user.id,
                    rate_perform_action: ratePerformActionAbp.rate_perform_action,
                    active: true
                }, 
                'PUT'  
            );
            const body_perform_action_abp = await resp_perform_action_abp.json();

            if ( body_perform_action_abp.ok ) {
                dispatch( updateRatePerformActionStepFiveAbp(
                    performActionId,
                    ratingId,
                    getRatePerformActionStepFiveAbpData( ratePerformActionAbp, ratingId )
                ));
            } else if ( body_perform_action_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_perform_action_abp.detail, 
                        getRatePerformActionAbpDataErrorMessage 
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_perform_action_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

const setPerformActionStepFiveAbpList = ( performActionList ) => ({
    type: abpStepsTypes.performActionStepFiveList,
    payload: performActionList
});

export const startRemovePerformActionStepFiveAbpList = () => ({
    type: abpStepsTypes.performActionStepFiveRemove
});

const startLoadingPerformActionStepFiveAbp = () => ({
    type: abpStepsTypes.performActionStepFiveLoad
});

const endLoadingPerformActionStepFiveAbp = () => ({
    type: abpStepsTypes.performActionStepFiveStop
});

const addNewPerformActionStepFiveAbp = ( performActionAbp ) => ({
    type: abpStepsTypes.performActionStepFiveNew,
    payload: performActionAbp
});

const blockPerformActionStepFiveAbp = ( performActionAbpId ) => ({
    type: abpStepsTypes.performActionStepFiveBlock,
    payload: performActionAbpId
});

const setRatePerformActionStepFiveAbpList = ( ratePerformActionList ) => ({
    type: abpStepsTypes.ratePerformActionStepFiveList,
    payload: ratePerformActionList
});

export const startRemoveRatePerformActionStepFiveAbpList = () => ({
    type: abpStepsTypes.ratePerformActionStepFiveRemove
});

const startLoadingRatePerformActionStepFiveAbp = () => ({
    type: abpStepsTypes.ratePerformActionStepFiveLoad
});

const endLoadingRatePerformActionStepFiveAbp = () => ({
    type: abpStepsTypes.ratePerformActionStepFiveStop
});

const updateRatePerformActionStepFiveAbp = ( 
    performActionId, 
    ratePerformActionId, 
    ratePerformAction 
) => ({
    type: abpStepsTypes.ratePerformActionStepFiveUpdate,
    payload: {
        performActionId,
        ratePerformActionId,
        ratePerformAction
    }
});