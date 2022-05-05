import Swal from "sweetalert2";

import { getError } from "../../../helpers/admin";
import { fetchWithToken } from "../../../helpers/fetch";
import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { 
    getGetInformationAbpDataErrorMessage, 
    getGetInformationStepSevenAbpData, 
    getInformationReferenceAbpDataErrorMessage, 
    getInformationReferenceStepSevenAbpData
} from "../../../helpers/abp-steps";


export const startLoadGetInformationModelAndReferencesAbpList = ( teamAbpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingGetInformationStepSevenAbp() );
            const resp_get_information_abp = await fetchWithToken( 
                `abp-steps/api/path/step-seven/get-information-abp/get-information-abp-reference/${teamAbpId}/` 
            );
            const body_get_information_abp = await resp_get_information_abp.json();
    
            if (body_get_information_abp.ok) {
                dispatch( setGetInformationStepSevenAbpList(
                    body_get_information_abp.conon_data
                ));
                dispatch( endLoadingGetInformationStepSevenAbp() );
            } else {
                Swal.fire('Error', body_get_information_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveGetInformationModelStepSevenAbp = ( 
    getInformationData, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_get_information_abp = await fetchWithToken( 
                'abp-steps/api/step-seven/get-information-abp/', 
                getInformationData, 
                'POST'  
            );
            const body_get_information_abp = await resp_get_information_abp.json();

            if ( body_get_information_abp.ok ) {
                dispatch( addNewGetInformationStepSevenAbp( 
                    getGetInformationStepSevenAbpData(
                        getInformationData, 
                        body_get_information_abp.id
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_get_information_abp.message, 
                    life: 4000 });
                
            } else if ( body_get_information_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_get_information_abp.detail, 
                        getGetInformationAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_get_information_abp}, consulte con el Desarrollador.`, 
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


export const startUpdateGetInformationStepSevenAbp = ( 
    getInformationData, informationId, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_get_information_abp = await fetchWithToken( 
                `abp-steps/api/step-seven/get-information-abp/${informationId}/`, 
                getInformationData, 
                'PUT'  
            );
            const body_get_information_abp = await resp_get_information_abp.json();

            if ( body_get_information_abp.ok ) {
                dispatch( updateGetInformationStepSevenAbp( 
                    getGetInformationStepSevenAbpData(
                        getInformationData, 
                        informationId
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Información Actualizada Correctamente.', 
                    life: 4000 });
                
            } else if ( body_get_information_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_get_information_abp.detail, 
                        getGetInformationAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_get_information_abp}, consulte con el Desarrollador.`, 
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

export const startSaveInformationReferenceStepSevenAbp = ( 
    informationReference, name, toast 
) => {
    return async ( dispatch ) => {
        try {
            const resp_get_information_abp = await fetchWithToken( 
                'abp-steps/api/step-seven/information-reference/', 
                informationReference, 
                'POST'  
            );
            const body_get_information_abp = await resp_get_information_abp.json();

            if ( body_get_information_abp.ok ) {
                dispatch( addNewInformationReferenceStepSevenAbp( 
                    getInformationReferenceStepSevenAbpData(
                        informationReference, 
                        body_get_information_abp.id,
                        name
                    ) 
                ));
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_get_information_abp.message, 
                    life: 4000 });
                
            } else if ( body_get_information_abp.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_get_information_abp.detail, 
                        getInformationReferenceAbpDataErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_get_information_abp}, consulte con el Desarrollador.`, 
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

export const startBlockInformationReferenceStepSevenAbp = ( referenceId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_get_information_abp = await fetchWithToken( 
                `abp-steps/api/step-seven/information-reference/${referenceId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_get_information_abp = await resp_get_information_abp.json();

            if ( body_get_information_abp.ok ) {
                dispatch( blockInformationReferenceStepSevenAbp(referenceId) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_get_information_abp.message, 
                    life: 4000 });
                
            } else if ( body_get_information_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_get_information_abp.detail, 
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

const setGetInformationStepSevenAbpList = ( getInformationList ) => ({
    type: abpStepsTypes.getInformationStepSevenList,
    payload: getInformationList
});

export const startRemoveGetInformationStepSevenAbpList = () => ({
    type: abpStepsTypes.getInformationStepSevenRemove
});

const startLoadingGetInformationStepSevenAbp = () => ({
    type: abpStepsTypes.getInformationStepSevenLoad
});

const endLoadingGetInformationStepSevenAbp = () => ({
    type: abpStepsTypes.getInformationStepSevenStop
});

const addNewGetInformationStepSevenAbp = ( getInformation ) => ({
    type: abpStepsTypes.getInformationStepSevenNew,
    payload: getInformation
});

const updateGetInformationStepSevenAbp = ( getInformation ) => ({
    type: abpStepsTypes.getInformationStepSevenUpdate,
    payload: getInformation
});

const addNewInformationReferenceStepSevenAbp = ( informationReferenceAbp ) => ({
    type: abpStepsTypes.informationReferenceStepSevenNew,
    payload: informationReferenceAbp
});

const blockInformationReferenceStepSevenAbp = ( informationReferenceAbpId ) => ({
    type: abpStepsTypes.informationReferenceStepSevenBlock,
    payload: informationReferenceAbpId
});