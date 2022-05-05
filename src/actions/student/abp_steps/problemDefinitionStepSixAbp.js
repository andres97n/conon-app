import Swal from "sweetalert2";

import { getError } from "../../../helpers/admin";
import { fetchWithToken } from "../../../helpers/fetch";
import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { 
    getProblemDefinitionAbpDataErrorMessage, 
    getProblemDefinitionReferenceAbpDataErrorMessage, 
    getProblemDefinitionReferenceStepSixAbpData, 
    getProblemDefinitionStepSixAbpData,
} from "../../../helpers/abp-steps";

export const startLoadProblemDefinitionReferencesAbpList = ( teamAbpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingProblemDefinitionStepSixAbp() );
            const resp_problem_definition_abp = await fetchWithToken( 
                `abp-steps/api/step-six/problem-definition-reference?team_abp=${teamAbpId}&active=true` 
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();
    
            if (body_problem_definition_abp.ok) {
                dispatch( setProblemDefinitionStepSixAbpList((
                    body_problem_definition_abp.conon_data
                )));
                dispatch( endLoadingProblemDefinitionStepSixAbp() );
            } else {
                Swal.fire('Error', body_problem_definition_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadProblemDefinitionAndReferencesAbpList = ( teamAbpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingProblemDefinitionStepSixAbp() );
            const resp_problem_definition_abp = await fetchWithToken( 
                `abp-steps/api/path/step-six/problem-definition/team-definition-references/${teamAbpId}/` 
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();
    
            if (body_problem_definition_abp.ok) {
                dispatch( setProblemDefinitionStepSixAbpList(
                    body_problem_definition_abp.conon_data
                ));
                dispatch( endLoadingProblemDefinitionStepSixAbp() );
            } else {
                Swal.fire('Error', body_problem_definition_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveProblemDefinitionStepSixAbp = ( 
    problemDefinition, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_problem_definition_abp = await fetchWithToken( 
                'abp-steps/api/step-six/problem-definition/', 
                problemDefinition, 
                'POST'  
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();

            if ( body_problem_definition_abp.ok ) {
                dispatch( addNewProblemDefinitionStepSixAbp( 
                    getProblemDefinitionStepSixAbpData(
                        problemDefinition, 
                        body_problem_definition_abp.id
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_problem_definition_abp.message, 
                    life: 4000 });
                
            } else if ( body_problem_definition_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_problem_definition_abp.detail, 
                        getProblemDefinitionAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_problem_definition_abp}, consulte con el Desarrollador.`, 
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

export const startUpdateProblemDefinitionStepSixAbp = ( 
    problemDefinition, definitionId, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_problem_definition_abp = await fetchWithToken( 
                `abp-steps/api/step-six/problem-definition/${definitionId}/`, 
                problemDefinition, 
                'PUT'  
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();

            if ( body_problem_definition_abp.ok ) {
                dispatch( updateProblemDefinitionStepSixAbp( 
                    getProblemDefinitionStepSixAbpData(
                        problemDefinition, 
                        definitionId
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Definición Actualizada Correctamente.', 
                    life: 4000 });
                
            } else if ( body_problem_definition_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_problem_definition_abp.detail, 
                        getProblemDefinitionAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_problem_definition_abp}, consulte con el Desarrollador.`, 
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


export const startBlockProblemDefinitionStepSixAbp = ( problemDefinitionId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_problem_definition_abp = await fetchWithToken( 
                `abp-steps/api/step-six/problem-definition/${problemDefinitionId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();

            if ( body_problem_definition_abp.ok ) {
                dispatch( blockProblemDefinitionStepSixAbp(problemDefinitionId) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_problem_definition_abp.message, 
                    life: 4000 });
                
            } else if ( body_problem_definition_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_problem_definition_abp.detail, 
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

export const startSaveProblemDefinitionReferenceStepSixAbp = ( 
    definitionReference, userName, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_problem_definition_abp = await fetchWithToken( 
                'abp-steps/api/step-six/problem-definition-reference/', 
                definitionReference, 
                'POST'  
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();

            if ( body_problem_definition_abp.ok ) {
                dispatch( addNewProblemDefinitionReferenceStepSixAbp( 
                    getProblemDefinitionReferenceStepSixAbpData(
                        definitionReference, 
                        body_problem_definition_abp.id,
                        userName
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_problem_definition_abp.message, 
                    life: 4000 });
                
            } else if ( body_problem_definition_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_problem_definition_abp.detail, 
                        getProblemDefinitionReferenceAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_problem_definition_abp}, consulte con el Desarrollador.`, 
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

export const startBlockProblemDefinitionReferenceStepSixAbp = ( referenceId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_problem_definition_abp = await fetchWithToken( 
                `abp-steps/api/step-six/problem-definition-reference/${referenceId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_problem_definition_abp = await resp_problem_definition_abp.json();

            if ( body_problem_definition_abp.ok ) {
                dispatch( blockProblemDefinitionReferenceStepSixAbp(referenceId) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_problem_definition_abp.message, 
                    life: 4000 });
                
            } else if ( body_problem_definition_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_problem_definition_abp.detail, 
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

const setProblemDefinitionStepSixAbpList = ( problemDefinitionList ) => ({
    type: abpStepsTypes.problemDefinitionStepSixList,
    payload: problemDefinitionList
});

export const startRemoveProblemDefinitionStepSixAbpList = () => ({
    type: abpStepsTypes.problemDefinitionStepSixRemove
});

const startLoadingProblemDefinitionStepSixAbp = () => ({
    type: abpStepsTypes.problemDefinitionStepSixLoad
});

const endLoadingProblemDefinitionStepSixAbp = () => ({
    type: abpStepsTypes.problemDefinitionStepSixStop
});

const addNewProblemDefinitionStepSixAbp = ( problemDefinition ) => ({
    type: abpStepsTypes.problemDefinitionStepSixNew,
    payload: problemDefinition
});

const updateProblemDefinitionStepSixAbp = ( problemDefinition ) => ({
    type: abpStepsTypes.problemDefinitionStepSixUpdate,
    payload: problemDefinition
});

const blockProblemDefinitionStepSixAbp = ( problemDefinitionAbpId ) => ({
    type: abpStepsTypes.problemDefinitionStepSixBlock,
    payload: problemDefinitionAbpId
});

const addNewProblemDefinitionReferenceStepSixAbp = ( problemDefinitionReference ) => ({
    type: abpStepsTypes.problemDefinitionReferenceStepSixNew,
    payload: problemDefinitionReference
});

const blockProblemDefinitionReferenceStepSixAbp = ( problemDefinitionReferenceAbpId ) => ({
    type: abpStepsTypes.problemDefinitionReferenceStepSixBlock,
    payload: problemDefinitionReferenceAbpId
});