import Swal from "sweetalert2";

import { getError } from "../../../helpers/admin";
import { fetchWithToken } from "../../../helpers/fetch";
import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { 
    getProblemResolutionAbpDataErrorMessage, 
    getProblemResolutionStepEightAbpData 
} from "../../../helpers/abp-steps";

export const startLoadCurrentProblemResolutionAbpList = ( teamAbpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingProblemResolutionStepEightAbp() );
            const resp_problem_resolution = await fetchWithToken( 
                `abp-steps/api/step-eight/problem-resolution?team_abp=${teamAbpId}&active=true` 
            );
            const body_problem_resolution = await resp_problem_resolution.json();
    
            if (body_problem_resolution.ok) {
                dispatch( setProblemResolutionStepEightAbpList((
                    body_problem_resolution.conon_data
                )));
                dispatch( endLoadingProblemResolutionStepEightAbp() );
            } else {
                Swal.fire('Error', body_problem_resolution.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveProblemResolutionStepEightAbp = ( 
    getInformationData, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_problem_resolution = await fetchWithToken( 
                'abp-steps/api/step-eight/problem-resolution/', 
                getInformationData, 
                'POST'  
            );
            const body_problem_resolution = await resp_problem_resolution.json();

            if ( body_problem_resolution.ok ) {
                dispatch( addNewProblemResolutionStepEightAbp( 
                    getProblemResolutionStepEightAbpData(
                        getInformationData, 
                        body_problem_resolution.id
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_problem_resolution.message, 
                    life: 4000 });
                
            } else if ( body_problem_resolution.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_problem_resolution.detail, 
                        getProblemResolutionAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_problem_resolution}, consulte con el Desarrollador.`, 
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

export const startUpdateProblemResolutionStepEightAbp = ( 
    problemResolution, resolutionId, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_problem_resolution = await fetchWithToken( 
                `abp-steps/api/step-eight/problem-resolution/${resolutionId}/`, 
                problemResolution, 
                'PUT'  
            );
            const body_problem_resolution = await resp_problem_resolution.json();

            if ( body_problem_resolution.ok ) {
                dispatch( updateProblemResolutionStepEightAbp( 
                    getProblemResolutionStepEightAbpData(
                        problemResolution, 
                        resolutionId
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Definición Actualizada Correctamente.', 
                    life: 4000 });
                
            } else if ( body_problem_resolution.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_problem_resolution.detail, 
                        getProblemResolutionAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_problem_resolution}, consulte con el Desarrollador.`, 
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

const setProblemResolutionStepEightAbpList = ( problemResolutionList ) => ({
    type: abpStepsTypes.problemResolutionStepEightList,
    payload: problemResolutionList
});

export const startRemoveProblemResolutionStepEightAbpList = () => ({
    type: abpStepsTypes.problemResolutionStepEightRemove
});

const startLoadingProblemResolutionStepEightAbp = () => ({
    type: abpStepsTypes.problemResolutionStepEightLoad
});

const endLoadingProblemResolutionStepEightAbp = () => ({
    type: abpStepsTypes.problemResolutionStepEightStop
});

const addNewProblemResolutionStepEightAbp = ( problemResolution ) => ({
    type: abpStepsTypes.problemResolutionStepEightNew,
    payload: problemResolution
});

const updateProblemResolutionStepEightAbp = ( problemResolution ) => ({
    type: abpStepsTypes.problemResolutionStepEightUpdate,
    payload: problemResolution
});