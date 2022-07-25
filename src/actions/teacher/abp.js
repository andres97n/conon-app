import Swal from "sweetalert2";

import { methodologyTypes } from "../../types/methodologyTypes";
import { fetchWithToken } from "../../helpers/fetch";
import { changeDate, getError } from "../../helpers/admin";
import { getAbpData, getAbpErrorMessage, getToastMsg } from "../../helpers/abp";
import { 
    endLoadingCurrentMethodology, 
    endLoadingTopics, 
    setCurrentMethodology, 
    startLoadingCurrentMethodology, 
    startLoadingTopics 
} from "../admin/topic";

export const startLoadAbpList = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingAbp() );
            const resp_dua = await fetchWithToken( 'abp/api/abp/' );
            const body_abp = await resp_dua.json();
    
            if (body_abp.ok) {
                dispatch( setAbpList( changeDate(body_abp.conon_data)));
                dispatch( endLoadingAbp() );
            } else {
                Swal.fire('Error', body_abp.detail, 'error');
                dispatch( endLoadingAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAbp() );
        }
    }
}

export const startLoadCurrentAbp = ( topicId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_abp = await fetchWithToken( `abp/api/abp?topic=${topicId}` );
            const body_abp = await resp_abp.json();
    
            if (body_abp.ok) {
                if (body_abp.conon_data) {
                    dispatch( setCurrentMethodology( body_abp.conon_data[0] ));
                }
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_abp.detail, 'error');
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

export const startLoadStudentEvaluationAbp = ( topicId ) => {
    return async (dispatch, getState) => {
        try {
            const { auth } = getState();
            const { uid } = auth;
            dispatch( startLoadingCurrentMethodology() );
            const resp_abp = await fetchWithToken( 
                `abp/api/path/abp/student-evaluation-abp/${topicId}/${uid}/` 
            );
            const body_abp = await resp_abp.json();
    
            if (body_abp.ok) {
                dispatch( setCurrentMethodology( body_abp.conon_data ));
                dispatch( endLoadingCurrentMethodology() );
            } else {
                Swal.fire('Error', body_abp.detail, 'error');
                }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveAbp = ( topicId, abp, toast ) => {
    return async ( dispatch ) => {
        try {
            const newAbp = { ...abp, topic: topicId,  };
            const resp_abp = await fetchWithToken( 
                'abp/api/abp/', newAbp, 'POST'  
            );
            const body_abp = await resp_abp.json();

            if ( body_abp.ok ) {
                dispatch(addNewAbp( 
                    { ...newAbp, id: body_abp.id }
                ));
                getToastMsg(toast, 'success', body_abp.message );
            } else if ( body_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_abp.detail, getAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateAbp = ( abp, abpId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_abp = await fetchWithToken( 
                `abp/api/abp/${abpId}/`, 
                {
                    topic: abp.topic,
                    problem: abp.problem,
                    oral_explication: abp.oral_explication,
                    descriptive_image: abp.descriptive_image,
                    reference_url: abp.reference_url,
                    state: abp.state || 1,
                }, 
                'PUT'  
            );
            const body_abp = await resp_abp.json();

            if ( body_abp.ok ) {
                dispatch( updateAbp( getAbpData( abp, abpId ) ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Metodología ABP Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_abp.detail, getAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteAbp = ( abpId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_abp = await fetchWithToken(
                `abp/api/abp/${abpId}/`, 
                {}, 
                'DELETE' );
            const body_abp = await resp_abp.json();

            if ( body_abp.ok ) {
                dispatch( deleteAbp( abpId ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_abp.message, 
                    life: 4000 });

            } else if (body_abp.detail) {
                Swal.fire(
                    'Error', body_abp.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setAbpList = ( abpList ) => ({
    type: methodologyTypes.abpList,
    payload: abpList
});

export const startRemoveAbpList = () => ({
    type: methodologyTypes.abpRemove
});

const startLoadingAbp = () => ({
    type: methodologyTypes.abpLoad
});

const endLoadingAbp = () => ({
    type: methodologyTypes.abpStop
});

const addNewAbp = ( abp ) => ({
    type: methodologyTypes.abpNew,
    payload: abp
});

const updateAbp = ( abp ) => ({
    type: methodologyTypes.abpUpdate,
    payload: abp
});

const deleteAbp = ( abpId ) => ({
    type: methodologyTypes.abpDelete,
    payload: abpId
});

export const startRemoveCurrentAbp = () => ({
    type: methodologyTypes.currentAbpRemove
});