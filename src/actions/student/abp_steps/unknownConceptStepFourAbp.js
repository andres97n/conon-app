import Swal from "sweetalert2";

import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { fetchWithToken } from "../../../helpers/fetch";
import { getError } from "../../../helpers/admin";
import { 
    getUnknownConceptAbpDataErrorMessage, 
    getUnknownConceptAbpDataManyErrorMessage, 
    getUnknownConceptReferenceAbpDataErrorMessage, 
    getUnknownConceptReferenceStepFourAbpData, 
    getUnknownConceptStepFourAbpData 
} from "../../../helpers/abp-steps";

export const startLoadUnknownConceptStepFourAbpList = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingUnknownConceptStepFourAbp() );
            const resp_unknown_concept_abp = await fetchWithToken( 
                `abp-steps/api/path/step-four/unknown-concept/unknown-concepts-references/${teamId}/` 
            );
            const body_unknown_concept_abp = await resp_unknown_concept_abp.json();
    
            if (body_unknown_concept_abp.ok) {
                dispatch( setUnknownConceptStepFourAbpList((
                    body_unknown_concept_abp.conon_data
                )));
                dispatch( endLoadingUnknownConceptStepFourAbp() );
            } else {
                Swal.fire('Error', body_unknown_concept_abp.detail, 'error');
                dispatch( endLoadingUnknownConceptStepFourAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingUnknownConceptStepFourAbp() );
        }
    }
}

export const startSaveUnknownConceptStepFourAbp = ( unknownConceptAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_unknown_concept_abp = await fetchWithToken( 
                'abp-steps/api/step-four/unknown-concept/', 
                unknownConceptAbp, 
                'POST'  
            );
            const body_unknown_concept_abp = await resp_unknown_concept_abp.json();

            if ( body_unknown_concept_abp.ok ) {
                if (typeof body_unknown_concept_abp.unknown_concept === 'number') {
                    dispatch( addNewUnknownConceptStepFourAbp( 
                        getUnknownConceptStepFourAbpData(
                            unknownConceptAbp, 
                            body_unknown_concept_abp.unknown_concept
                        ) 
                    ));
                } else if (Array.isArray(body_unknown_concept_abp.unknown_concept)) {
                    body_unknown_concept_abp.unknown_concept.forEach( concept => {
                        dispatch( addNewUnknownConceptStepFourAbp(
                            getUnknownConceptStepFourAbpData( concept, concept.id )
                        ));
                    });
                }
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_unknown_concept_abp.message, 
                    life: 4000 });
                
            } else if ( body_unknown_concept_abp.detail ) {
                Swal.fire(
                    'Error',
                    (Array.isArray(body_unknown_concept_abp.detail))
                        ? (
                            getUnknownConceptAbpDataManyErrorMessage()
                        )
                        : (
                            getError( 
                                body_unknown_concept_abp.detail, 
                                getUnknownConceptAbpDataErrorMessage 
                            )

                        ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_unknown_concept_abp}, consulte con el Desarrollador.`, 
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

export const startBlockUnknownConceptStepFourAbp = ( unknownConceptAbpId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_unknown_concept_abp = await fetchWithToken( 
                `abp-steps/api/step-four/unknown-concept/${unknownConceptAbpId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_unknown_concept_abp = await resp_unknown_concept_abp.json();

            if ( body_unknown_concept_abp.ok ) {
                dispatch( blockUnknownConceptStepFourAbp(unknownConceptAbpId));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_unknown_concept_abp.message, 
                    life: 4000 });
                
            } else if ( body_unknown_concept_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_unknown_concept_abp.detail, 
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

export const startSaveUnknownConceptReferenceStepFourAbp = ( 
    unknownConceptReference, userName, toast
) => {
    return async ( dispatch ) => {
        try {
            const resp_unknown_concept_reference_abp = await fetchWithToken( 
                'abp-steps/api/step-four/unknown-concept-reference/', 
                unknownConceptReference, 
                'POST'  
            );
            const body_unknown_concept_reference_abp = 
            await resp_unknown_concept_reference_abp.json();

            if ( body_unknown_concept_reference_abp.ok ) {
                dispatch( addNewUnknownConceptReferenceStepFourAbp(
                    unknownConceptReference.unknown_concept_step_four_abp,
                    getUnknownConceptReferenceStepFourAbpData(
                        unknownConceptReference, 
                        userName,
                        body_unknown_concept_reference_abp.reference
                    ) 
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_unknown_concept_reference_abp.message, 
                    life: 4000 });

            } else if ( body_unknown_concept_reference_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_unknown_concept_reference_abp.detail, 
                        getUnknownConceptReferenceAbpDataErrorMessage 
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_unknown_concept_reference_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startBlockUnknownConceptReferenceStepFourAbp = ( 
    unknownConceptAbpId, unknownConceptReferenceAbpId, toast 
) => {
    return async (dispatch) => {
        try {
            const resp_unknown_concept_reference_abp = await fetchWithToken( 
                `abp-steps/api/step-four/unknown-concept-reference/${unknownConceptReferenceAbpId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_unknown_concept_reference_abp = 
            await resp_unknown_concept_reference_abp.json();

            if ( body_unknown_concept_reference_abp.ok ) {
                dispatch( blockUnknownConceptReferenceStepFourAbp(
                    unknownConceptAbpId,
                    unknownConceptReferenceAbpId
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_unknown_concept_reference_abp.message, 
                    life: 4000 });
                
            } else if ( body_unknown_concept_reference_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_unknown_concept_reference_abp.detail, 
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

const setUnknownConceptStepFourAbpList = ( unknownConceptList ) => ({
    type: abpStepsTypes.unknownConceptStepFourList,
    payload: unknownConceptList
});

export const startRemoveUnknownConceptStepFourAbpList = () => ({
    type: abpStepsTypes.unknownConceptStepFourRemove
});

const startLoadingUnknownConceptStepFourAbp = () => ({
    type: abpStepsTypes.unknownConceptStepFourLoad
});

const endLoadingUnknownConceptStepFourAbp = () => ({
    type: abpStepsTypes.unknownConceptStepFourStop
});

const addNewUnknownConceptStepFourAbp = ( unknownConceptAbp ) => ({
    type: abpStepsTypes.unknownConceptStepFourNew,
    payload: unknownConceptAbp
});

const blockUnknownConceptStepFourAbp = ( unknownConceptAbpId ) => ({
    type: abpStepsTypes.unknownConceptStepFourBlock,
    payload: unknownConceptAbpId
});

const addNewUnknownConceptReferenceStepFourAbp = ( 
    unknownConceptAbpId, unknownConceptReferenceAbp 
) => ({
    type: abpStepsTypes.unknownConceptReferenceStepFourNew,
    payload: {
        unknownConceptAbpId,
        unknownConceptReferenceAbp
    }
});

const blockUnknownConceptReferenceStepFourAbp = ( 
    unknownConceptAbpId, unknownConceptReferenceAbpId 
) => ({
    type: abpStepsTypes.unknownConceptReferenceStepFourBlock,
    payload: {
        unknownConceptAbpId,
        unknownConceptReferenceAbpId
    }
});