import Swal from "sweetalert2";

import { methodologyTypes } from "../../types/methodologyTypes";
import { getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { 
    getEvaluationDetailAbpErrorMessage, 
    getToastMsg 
} from "../../helpers/abp";

export const startSaveEvaluationDetailAbp = ( evaluationDetailAbp, evaluationId, toast ) => {
    return async ( dispatch ) => {
        try {
            const newEvaluationId = {
                ...evaluationDetailAbp,
                evaluation_abp: evaluationId
            };
            const resp_evaluation_abp = await fetchWithToken( 
                'abp/api/evaluation-detail-abp/', 
                newEvaluationId, 
                'POST'  
            );
            const body_evaluation_abp = await resp_evaluation_abp.json();

            if ( body_evaluation_abp.ok ) {
                dispatch( addNewEvaluationDetailAbp( 
                    { ...newEvaluationId, id: body_evaluation_abp.id }
                    // getEvaluationDetailAbpData( newEvaluationId, body_evaluation_abp.id ) 
                ));
                getToastMsg(toast, 'success', body_evaluation_abp.message );
                
            } else if ( body_evaluation_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_evaluation_abp.detail, 
                        getEvaluationDetailAbpErrorMessage
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

export const startBlockEvaluationDetailAbp = ( evaluationDetailId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_evaluation_abp = await fetchWithToken( 
                `abp-steps/api/evaluation-detail-abp/${evaluationDetailId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_evaluation_abp = await resp_evaluation_abp.json();

            if ( body_evaluation_abp.ok ) {
                dispatch( blockEvaluationDetailAbp(evaluationDetailId) );
                getToastMsg(toast, 'error', body_evaluation_abp.message );                
            } else if ( body_evaluation_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_evaluation_abp.detail, 
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

const addNewEvaluationDetailAbp = ( evaluationDetailAbp ) => ({
    type: methodologyTypes.evaluationDetailAbpNew,
    payload: evaluationDetailAbp
});

const blockEvaluationDetailAbp = ( evaluationDetailAbpId ) => ({
    type: methodologyTypes.evaluationDetailAbpBlock,
    payload: evaluationDetailAbpId
});
