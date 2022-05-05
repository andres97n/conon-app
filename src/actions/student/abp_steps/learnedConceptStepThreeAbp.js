import Swal from "sweetalert2";

import { fetchWithToken } from "../../../helpers/fetch";
import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { getError } from "../../../helpers/admin";
import { 
    getLearnedConceptAbpDataErrorMessage, 
    getLearnedConceptAbpDataManyErrorMessage, 
    getLearnedConceptReferenceAbpDataErrorMessage, 
    getLearnedConceptReferenceStepThreeAbpData, 
    getLearnedConceptStepThreeAbpData 
} from "../../../helpers/abp-steps";

export const startLoadLearnedConceptsStepThreeAbpList = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingLearnedConceptStepThreeAbp() );
            const resp_learned_concept_abp = await fetchWithToken( 
                `abp-steps/api/path/step-three/learned-concept/learned-concepts-references/${teamId}/` 
            );
            const body_learned_concept_abp = await resp_learned_concept_abp.json();
    
            if (body_learned_concept_abp.ok) {
                dispatch( setLearnedConceptStepThreeAbpList((
                    body_learned_concept_abp.conon_data
                )));
                dispatch( endLoadingLearnedConceptStepThreeAbp() );
            } else {
                Swal.fire('Error', body_learned_concept_abp.detail, 'error');
                dispatch( endLoadingLearnedConceptStepThreeAbp() );
            }

        } catch (error) {
            console.log('entro');
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingLearnedConceptStepThreeAbp() );
        }
    }
}

export const startSaveLearnedConceptStepThreeAbp = ( learnedConceptAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_learned_concept_abp = await fetchWithToken( 
                'abp-steps/api/step-three/learned-concept/', 
                learnedConceptAbp, 
                'POST'  
            );
            const body_learned_concept_abp = await resp_learned_concept_abp.json();

            if ( body_learned_concept_abp.ok ) {
                if (typeof body_learned_concept_abp.learned_concept === 'number') {
                    dispatch( addNewLearnedConceptStepThreeAbp( 
                        getLearnedConceptStepThreeAbpData(
                            learnedConceptAbp, 
                            body_learned_concept_abp.learned_concept
                        ) 
                    ));
                } else if (Array.isArray(body_learned_concept_abp.learned_concept)) {
                    body_learned_concept_abp.learned_concept.forEach( concept => {
                        dispatch( addNewLearnedConceptStepThreeAbp(
                            getLearnedConceptStepThreeAbpData( concept, concept.id )
                        ));
                    });
                }
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_learned_concept_abp.message, 
                    life: 4000 });
                
            } else if ( body_learned_concept_abp.detail ) {
                Swal.fire(
                    'Error',
                    (Array.isArray(body_learned_concept_abp.detail))
                        ? (
                            getLearnedConceptAbpDataManyErrorMessage()
                        )
                        : (
                            getError( 
                                body_learned_concept_abp.detail, 
                                getLearnedConceptAbpDataErrorMessage 
                            )

                        ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_learned_concept_abp}, consulte con el Desarrollador.`, 
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

export const startBlockLearnedConceptStepThreeAbp = ( learnedConceptAbpId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_learned_concept_abp = await fetchWithToken( 
                `abp-steps/api/step-three/learned-concept/${learnedConceptAbpId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_learned_concept_abp = await resp_learned_concept_abp.json();

            if ( body_learned_concept_abp.ok ) {
                dispatch( blockLearnedConceptStepThreeAbp(learnedConceptAbpId));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_learned_concept_abp.message, 
                    life: 4000 });
                
            } else if ( body_learned_concept_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_learned_concept_abp.detail, 
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

export const startSaveLearnedConceptReferenceStepThreeAbp = ( 
    learnedConceptReference, userName, toast
) => {
    return async ( dispatch ) => {
        try {
            const resp_learned_concept_reference_abp = await fetchWithToken( 
                'abp-steps/api/step-three/learned-concept-reference/', 
                learnedConceptReference, 
                'POST'  
            );
            const body_learned_concept_reference_abp = 
            await resp_learned_concept_reference_abp.json();

            if ( body_learned_concept_reference_abp.ok ) {
                dispatch( addNewLearnedConceptReferenceStepThreeAbp(
                    learnedConceptReference.learned_concept_step_three_abp,
                    getLearnedConceptReferenceStepThreeAbpData(
                        learnedConceptReference, 
                        userName,
                        body_learned_concept_reference_abp.reference
                    ) 
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_learned_concept_reference_abp.message, 
                    life: 4000 });

            } else if ( body_learned_concept_reference_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_learned_concept_reference_abp.detail, 
                        getLearnedConceptReferenceAbpDataErrorMessage 
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_learned_concept_reference_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startBlockLearnedConceptReferenceStepThreeAbp = ( 
    learnedConceptAbpId, learnedConceptReferenceAbpId, toast 
) => {
    return async (dispatch) => {
        try {
            const resp_learned_concept_reference_abp = await fetchWithToken( 
                `abp-steps/api/step-three/learned-concept-reference/${learnedConceptReferenceAbpId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_learned_concept_reference_abp = 
            await resp_learned_concept_reference_abp.json();

            if ( body_learned_concept_reference_abp.ok ) {
                dispatch( blockLearnedConceptReferenceStepThreeAbp(
                    learnedConceptAbpId,
                    learnedConceptReferenceAbpId
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_learned_concept_reference_abp.message, 
                    life: 4000 });
                
            } else if ( body_learned_concept_reference_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_learned_concept_reference_abp.detail, 
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

const setLearnedConceptStepThreeAbpList = ( learnedConceptList ) => ({
    type: abpStepsTypes.learnedConceptStepThreeList,
    payload: learnedConceptList
});

export const startRemoveLearnedConceptStepThreeAbpList = () => ({
    type: abpStepsTypes.learnedConceptStepThreeRemove
});

const startLoadingLearnedConceptStepThreeAbp = () => ({
    type: abpStepsTypes.learnedConceptStepThreeLoad
});

const endLoadingLearnedConceptStepThreeAbp = () => ({
    type: abpStepsTypes.learnedConceptStepThreeStop
});

const addNewLearnedConceptStepThreeAbp = ( learnedConceptAbp ) => ({
    type: abpStepsTypes.learnedConceptStepThreeNew,
    payload: learnedConceptAbp
});

const blockLearnedConceptStepThreeAbp = ( learnedConceptAbpId ) => ({
    type: abpStepsTypes.learnedConceptStepThreeBlock,
    payload: learnedConceptAbpId
});

const addNewLearnedConceptReferenceStepThreeAbp = ( 
    learnedConceptAbpId, learnedConceptReferenceAbp 
) => ({
    type: abpStepsTypes.learnedConceptReferenceStepThreeNew,
    payload: {
        learnedConceptAbpId,
        learnedConceptReferenceAbp
    }
});

const blockLearnedConceptReferenceStepThreeAbp = ( 
    learnedConceptAbpId, learnedConceptReferenceAbpId 
) => ({
    type: abpStepsTypes.learnedConceptReferenceStepThreeBlock,
    payload: {
        learnedConceptAbpId,
        learnedConceptReferenceAbpId
    }
});