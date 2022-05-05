import Swal from "sweetalert2";

import { 
    getEvaluationAbpData, 
    getEvaluationAbpErrorMessage,
} from "../../helpers/abp";
import { getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { methodologyTypes } from "../../types/methodologyTypes";
import { startSaveEvaluationDetailAbp } from "./evaluationDetailAbp";

export const startLoadEvaluationAbpList = ( abpId, teamDetailAbpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingEvaluationAbp() );
            const resp_evaluation_abp = await fetchWithToken( 
                `abp/api/evaluation-abp?abp=${abpId}&team_detail_abp=${teamDetailAbpId}&state=1` 
            );
            const body_evaluation_abp = await resp_evaluation_abp.json();
    
            if (body_evaluation_abp.ok) {
                dispatch( setEvaluationAbpList((
                    body_evaluation_abp.conon_data
                )));
                dispatch( endLoadingEvaluationAbp() );
            } else {
                Swal.fire('Error', body_evaluation_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadEvaluationDetailAbpList = ( abpId, teamDetailAbpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingEvaluationAbp() );
            const resp_evaluation_abp = await fetchWithToken( 
                `abp/api/path/evaluation-abp/evaluation-abp-detail-by-evaluation/${abpId}/${teamDetailAbpId}/` 
            );
            const body_evaluation_abp = await resp_evaluation_abp.json();
    
            if (body_evaluation_abp.ok) {
                dispatch( setEvaluationDetailAbpList((
                    body_evaluation_abp.conon_data
                )));
                dispatch( endLoadingEvaluationAbp() );
            } else {
                Swal.fire('Error', body_evaluation_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveEvaluationAbp = ( evaluationAbp, evaluationDetailAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_evaluation_abp = await fetchWithToken( 
                'abp/api/evaluation-abp/', 
                evaluationAbp, 
                'POST'  
            );
            const body_evaluation_abp = await resp_evaluation_abp.json();

            if ( body_evaluation_abp.ok ) {
                dispatch( addNewEvaluationAbp( 
                    getEvaluationAbpData( evaluationAbp, body_evaluation_abp.id ) 
                ));
                dispatch( startSaveEvaluationDetailAbp( 
                    evaluationDetailAbp, body_evaluation_abp.id, toast 
                ));
                // getToastMsg(toast, 'error', body_evaluation_abp.message );
                
            } else if ( body_evaluation_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_evaluation_abp.detail, 
                        getEvaluationAbpErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_evaluation_abp}, consulte con el Desarrollador.`, 
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

export const startUpdateEvaluationAbp = ( 
    evaluationAbp, evaluationId, evaluationDetailAbp, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_evaluation_abp = await fetchWithToken( 
                `abp/api/evaluation-abp/${evaluationId}/`, 
                evaluationAbp, 
                'PUT'  
            );
            const body_evaluation_abp = await resp_evaluation_abp.json();

            if ( body_evaluation_abp.ok ) {
                dispatch( updateEvaluationAbp( 
                    getEvaluationAbpData( evaluationAbp, evaluationId ) 
                ));
                dispatch( startSaveEvaluationDetailAbp( 
                    evaluationDetailAbp, evaluationId, toast 
                ));
                // getToastMsg(toast, 'error', 'Definición Actualizada Correctamente.' );
            } else if ( body_evaluation_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_evaluation_abp.detail, 
                        getEvaluationAbpErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_evaluation_abp}, consulte con el Desarrollador.`, 
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

const startLoadingEvaluationAbp = () => ({
    type: methodologyTypes.evaluationAbpLoad
});

const endLoadingEvaluationAbp = () => ({
    type: methodologyTypes.evaluationAbpStop
});

const setEvaluationAbpList = ( evaluationAbpList ) => ({
    type: methodologyTypes.evaluationAbpList,
    payload: evaluationAbpList
});

export const startRemoveEvaluationAbpList = () => ({
    type: methodologyTypes.evaluationAbpRemove
}); 

const setEvaluationDetailAbpList = ( evaluationDetailAbpList ) => ({
    type: methodologyTypes.evaluationDetailAbpList,
    payload: evaluationDetailAbpList
});

export const startRemoveEvaluationDetailAbpList = () => ({
    type: methodologyTypes.evaluationDetailAbpRemove
});

const addNewEvaluationAbp = ( evaluationAbp ) => ({
    type: methodologyTypes.evaluationAbpNew,
    payload: evaluationAbp
});

const updateEvaluationAbp = ( evaluationAbp ) => ({
    type: methodologyTypes.evaluationAbpUpdate,
    payload: evaluationAbp
});